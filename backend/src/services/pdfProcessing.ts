import pdfplumber from 'pdfplumber';
import * as fs from 'fs/promises';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

interface ExtractedHolding {
  name: string;
  symbol?: string;
  quantity?: number;
  price?: number;
  value: number;
}

interface ParsedStatement {
  institution: string;
  accountType: string;
  assetCategory: string;
  statementDate: string;
  holdings: ExtractedHolding[];
  totalValue: number;
}

// Templates for different statement formats
const STATEMENT_TEMPLATES = {
  cdsl: {
    patterns: {
      name: /(?:Name|NAME)[\s:]+([A-Za-z\s]+)/i,
      holdings: /(?:ISIN|Security Name|Quantity)[^\n]*/gi,
      total: /(?:Total Value|Net Closing Value)[\s:]+([\d,]+)/i,
    },
    extractors: {
      holdings: (text: string) => {
        const holdings: ExtractedHolding[] = [];
        const lines = text.split('\n');
        
        for (const line of lines) {
          // Match common CDSL statement format
          const match = line.match(/([A-Z]{5}\d{6}[A-Z])\s+(.+?)\s+(\d+)\s+([\d.]+)\s+([\d,]+)/);
          if (match) {
            holdings.push({
              symbol: match[1],
              name: match[2].trim(),
              quantity: parseInt(match[3]),
              price: parseFloat(match[4]),
              value: parseFloat(match[5].replace(/,/g, '')),
            });
          }
        }
        
        return holdings;
      },
    },
  },
  zerodha: {
    patterns: {
      name: /(?:Name|Client)[\s:]+([A-Za-z\s]+)/i,
      holdings: /(?:Symbol|Scrip)[^\n]*/gi,
      total: /(?:Closing Value|Total)[\s:]+([\d,.]+)/i,
    },
    extractors: {
      holdings: (text: string) => {
        const holdings: ExtractedHolding[] = [];
        const lines = text.split('\n');
        
        for (const line of lines) {
          // Match Zerodha console format
          const match = line.match(/(.+?)\s+(\d+)\s+([\d.]+)\s+([\d,.]+)/);
          if (match && match[1].length > 3) {
            holdings.push({
              name: match[1].trim(),
              quantity: parseInt(match[2]),
              price: parseFloat(match[3]),
              value: parseFloat(match[4].replace(/,/g, '')),
            });
          }
        }
        
        return holdings;
      },
    },
  },
};

export class PDFProcessingPipeline {
  private tempDir: string;

  constructor() {
    this.tempDir = process.env.TEMP_DIR || '/tmp/vaultix';
  }

  async processPDF(fileBuffer: Buffer, password?: string): Promise<ParsedStatement> {
    // Save to temp file
    const tempPath = path.join(this.tempDir, `${uuidv4()}.pdf`);
    await fs.writeFile(tempPath, fileBuffer);

    try {
      const pdf = await pdfplumber.open(tempPath, { password });
      
      let fullText = '';
      for (const page of pdf.pages) {
        const text = await page.extractText();
        if (text) {
          fullText += text + '\n';
        }
      }

      // Detect institution type
      const institutionType = this.detectInstitutionType(fullText);
      
      // Parse based on detected type
      const parsed = this.parseByType(institutionType, fullText);
      
      // Add metadata
      parsed.statementDate = this.extractDate(fullText);
      parsed.institution = institutionType;

      return parsed;
    } finally {
      // Cleanup temp file
      await fs.unlink(tempPath).catch(() => {});
    }
  }

  private detectInstitutionType(text: string): string {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('cdsl') || lowerText.includes('central depository')) {
      return 'cdsl';
    }
    if (lowerText.includes('zerodha') || lowerText.includes('kite')) {
      return 'zerodha';
    }
    if (lowerText.includes('angel one') || lowerText.includes('angelbroking')) {
      return 'angelone';
    }
    if (lowerText.includes('icici prudential') || lowerText.includes('icici amc')) {
      return 'icici_mf';
    }
    if (lowerText.includes('hdfc amc') || lowerText.includes('hdfc mutual fund')) {
      return 'hdfc_mf';
    }
    if (lowerText.includes('nse') || lowerText.includes('national stock exchange')) {
      return 'nse';
    }
    
    return 'generic';
  }

  private parseByType(type: string, text: string): ParsedStatement {
    const template = STATEMENT_TEMPLATES[type as keyof typeof STATEMENT_TEMPLATES] || STATEMENT_TEMPLATES.cdsl;
    
    const holdings = template.extractors.holdings(text);
    const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
    
    // Determine asset category
    const assetCategory = this.determineAssetCategory(text, type);
    
    // Determine account type
    const accountType = this.determineAccountType(text, type);

    return {
      institution: type.toUpperCase(),
      accountType,
      assetCategory,
      statementDate: new Date().toISOString(),
      holdings,
      totalValue,
    };
  }

  private determineAssetCategory(text: string, type: string): string {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('mutual fund') || lowerText.includes('mf') || type.includes('mf')) {
      return 'mutual_funds';
    }
    if (lowerText.includes('future') || lowerText.includes('option') || lowerText.includes('f&o')) {
      return 'fo';
    }
    if (lowerText.includes('insurance') || lowerText.includes('life insurance')) {
      return 'insurance';
    }
    if (lowerText.includes('fixed deposit') || lowerText.includes('fd') || lowerText.includes('recurring deposit')) {
      return 'bank_deposits';
    }
    if (lowerText.includes('demat') || lowerText.includes('share') || lowerText.includes('equity')) {
      return 'stocks';
    }
    
    return 'other';
  }

  private determineAccountType(text: string, type: string): string {
    const lowerText = text.toLowerCase();
    
    if (type.includes('mf')) return 'Mutual Fund';
    if (lowerText.includes('demat')) return 'Demat';
    if (lowerText.includes('trading')) return 'Trading';
    if (lowerText.includes('future') || lowerText.includes('option')) return 'F&O';
    if (lowerText.includes('insurance')) return 'Insurance';
    if (lowerText.includes('fixed deposit')) return 'FD';
    
    return 'Investment';
  }

  private extractDate(text: string): string {
    // Try multiple date patterns
    const patterns = [
      /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,
      /(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/,
      /(?:as on|Date)[\s:]+(\d{1,2}\s+\w+\s+\d{4})/i,
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        try {
          return new Date(match[0]).toISOString();
        } catch {
          continue;
        }
      }
    }

    return new Date().toISOString();
  }

  toJSON(parsed: ParsedStatement): string {
    return JSON.stringify(parsed, null, 2);
  }
}

export const pdfProcessor = new PDFProcessingPipeline();
