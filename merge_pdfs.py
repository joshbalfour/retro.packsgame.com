#!/usr/bin/env python3
"""
Merge all instruction PDFs into a single file for easier embedding
"""

import os
from pypdf import PdfWriter, PdfReader

def merge_instruction_pdfs():
    # Define the order of PDFs to merge
    pdf_files = [
        "instructions/Front Cover (GB Studio).pdf",
        "instructions/2.pdf",
        "instructions/3.pdf", 
        "instructions/4.pdf",
        "instructions/5.pdf",
        "instructions/6.pdf",
        "instructions/7.pdf",
        "instructions/Back Cover.pdf"
    ]
    
    # Create writer object
    writer = PdfWriter()
    
    # Add each PDF to the writer
    for pdf_file in pdf_files:
        if os.path.exists(pdf_file):
            print(f"Adding {pdf_file}")
            reader = PdfReader(pdf_file)
            for page in reader.pages:
                writer.add_page(page)
        else:
            print(f"Warning: {pdf_file} not found")
    
    # Write the merged PDF
    output_file = "instructions/Complete_Manual.pdf"
    with open(output_file, 'wb') as output:
        writer.write(output)
    
    print(f"Successfully merged PDFs into {output_file}")

if __name__ == "__main__":
    merge_instruction_pdfs()
