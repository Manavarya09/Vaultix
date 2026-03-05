import { google } from 'googleapis';

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.modify',
];

interface EmailMessage {
  id: string;
  subject: string;
  from: string;
  date: string;
  attachments: AttachmentInfo[];
}

interface AttachmentInfo {
  id: string;
  filename: string;
  mimeType: string;
}

export class EmailIngestionService {
  private oauth2Client: any;
  
  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
  }

  setCredentials(accessToken: string, refreshToken?: string): void {
    this.oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  }

  async scanInbox(): Promise<EmailMessage[]> {
    const gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });
    
    // Search for investment-related emails
    const query = `
      (subject:("statement" OR "portfolio" OR "holdings" OR "demat" OR "trade" OR "confirmation"))
      OR (from:("cdsl" OR "nsdl" OR " Zerodha" OR "Upstox" OR "Angel One" OR "ICICI" OR "HDFC" OR "SBI" OR "Axis Bank"))
    `;
    
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: query,
      maxResults: 50,
    });

    const messages: EmailMessage[] = [];
    
    for (const message of response.data.messages || []) {
      const msg = await gmail.users.messages.get({
        userId: 'me',
        id: message.id!,
        format: 'full',
      });

      const headers = msg.data.payload?.headers || [];
      const subject = headers.find((h: any) => h.name === 'Subject')?.value || '';
      const from = headers.find((h: any) => h.name === 'From')?.value || '';
      const date = headers.find((h: any) => h.name === 'Date')?.value || '';

      const attachments: AttachmentInfo[] = [];
      if (msg.data.payload?.parts) {
        for (const part of msg.data.payload.parts) {
          if (part.filename && part.filename.endsWith('.pdf')) {
            attachments.push({
              id: part.body?.attachmentId || '',
              filename: part.filename,
              mimeType: part.mimeType || 'application/pdf',
            });
          }
        }
      }

      if (attachments.length > 0) {
        messages.push({
          id: message.id!,
          subject,
          from,
          date,
          attachments,
        });
      }
    }

    return messages;
  }

  async downloadAttachment(messageId: string, attachmentId: string): Promise<Buffer> {
    const gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });
    
    const response = await gmail.users.messages.attachments.get({
      userId: 'me',
      messageId,
      id: attachmentId,
    });

    // Decode base64
    const data = response.data.data?.replace(/-/g, '+').replace(/_/g, '/') || '';
    return Buffer.from(data, 'base64');
  }

  getAuthUrl(): string {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
  }

  async getTokensFromCode(code: string): Promise<{ accessToken: string; refreshToken: string }> {
    const { tokens } = await this.oauth2Client.getToken(code);
    return {
      accessToken: tokens.access_token || '',
      refreshToken: tokens.refresh_token || '',
    };
  }
}

export const emailService = new EmailIngestionService();
