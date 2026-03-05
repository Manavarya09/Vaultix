import { emailService } from '../services/emailIngestion.js';
import { pdfProcessor } from '../services/pdfProcessing.js';

interface ScanResult {
  emailId: string;
  subject: string;
  attachmentFilename: string;
  status: 'processed' | 'failed' | 'skipped';
  extractedData?: any;
  error?: string;
}

export class EmailIngestionWorker {
  private isProcessing: boolean = false;
  private pollInterval: NodeJS.Timeout | null = null;

  async start(userId: string, accessToken: string, refreshToken?: string): Promise<void> {
    if (this.isProcessing) {
      console.log('Worker already running');
      return;
    }

    this.isProcessing = true;
    emailService.setCredentials(accessToken, refreshToken);

    console.log(`Starting email ingestion worker for user ${userId}`);

    // Initial scan
    await this.scanEmails(userId);

    // Set up polling interval (every 60 seconds as per requirements)
    this.pollInterval = setInterval(() => {
      this.scanEmails(userId).catch(console.error);
    }, 60000);
  }

  async stop(): Promise<void> {
    this.isProcessing = false;
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
    console.log('Email ingestion worker stopped');
  }

  private async scanEmails(userId: string): Promise<ScanResult[]> {
    console.log(`Scanning emails for user ${userId}`);
    
    const results: ScanResult[] = [];
    
    try {
      const messages = await emailService.scanInbox();
      console.log(`Found ${messages.length} investment emails`);

      for (const message of messages) {
        for (const attachment of message.attachments) {
          try {
            // Download attachment
            const pdfBuffer = await emailService.downloadAttachment(
              message.id,
              attachment.id
            );

            // Process PDF
            const extractedData = await pdfProcessor.processPDF(pdfBuffer);

            // Save to database (would be done here in production)
            
            results.push({
              emailId: message.id,
              subject: message.subject,
              attachmentFilename: attachment.filename,
              status: 'processed',
              extractedData,
            });

            console.log(`Processed: ${attachment.filename}`);
          } catch (error) {
            results.push({
              emailId: message.id,
              subject: message.subject,
              attachmentFilename: attachment.filename,
              status: 'failed',
              error: error instanceof Error ? error.message : 'Unknown error',
            });
          }
        }
      }
    } catch (error) {
      console.error('Error scanning emails:', error);
    }

    return results;
  }
}

export const ingestionWorker = new EmailIngestionWorker();
