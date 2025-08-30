declare module 'pdf-parse' {
  interface PDFData {
    text: string;
    numpages: number;
    numrender: number;
    info: {
      Producer: string;
      Creator: string;
      Title: string;
      Author: string;
      Subject: string;
      Keywords: string;
    };
    metadata: any;
    version: string;
    pdf: any;
  }

  function pdf(dataBuffer: Buffer, options?: any): Promise<PDFData>;
  export = pdf;
}
