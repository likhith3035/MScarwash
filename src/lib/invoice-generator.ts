import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Booking } from './types';

async function getLogoDataUrl(): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = '/logo.png';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(null);
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve(null);
  });
}

export async function generateInvoicePDF(
  booking: Booking,
  billedBy: string = 'Naveen (Manager)',
  paymentMethod: string = 'Cash',
  autoSave: boolean = false
): Promise<{ doc: jsPDF; blobUrl: string; download: () => void; fileName: string }> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const margin = 16;
  const contentWidth = pageWidth - margin * 2; // 178mm

  // Load emblem logo
  const logoData = await getLogoDataUrl();

  // 1. TOP HEADER BRANDING BAR
  doc.setFillColor(15, 23, 42); // Dark Navy Blue (#0F172A)
  doc.rect(0, 0, pageWidth, 42, 'F');

  if (logoData) {
    try {
      doc.addImage(logoData, 'PNG', margin, 7, 28, 28);
    } catch (e) {
      console.warn('Could not render logo in PDF', e);
    }
  }

  const textStartX = logoData ? margin + 32 : margin;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text('MS CAR WASH', textStartX, 18);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(16, 185, 129); // Emerald Green Accent
  doc.text('Clean Car... Happy Ride!', textStartX, 24);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225); // Light slate text
  doc.text('Panagal, Opp Old RTO Office, Beside Bharat Petroleum, Srikalahasti - 517644', textStartX, 30);
  doc.text('Phone: +91 9494829450, 8309390902 | WhatsApp: +91 8885426155', textStartX, 35);

  // 2. INVOICE META ROW (BELOW HEADER)
  let currentY = 50;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text('OFFICIAL TAX INVOICE', margin, currentY);

  // Exact timestamp formatting with SECONDS
  const bDate = booking.createdAt ? new Date(booking.createdAt) : new Date();
  const formattedDateTimeWithSeconds = bDate.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(217, 119, 87); // Terracotta accent
  doc.text(`Invoice No: ${booking.id}`, pageWidth - margin, currentY, { align: 'right' });

  currentY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`Date & Time: ${formattedDateTimeWithSeconds}`, pageWidth - margin, currentY, { align: 'right' });

  currentY += 5;
  doc.text(`Billed By: ${billedBy}`, pageWidth - margin, currentY, { align: 'right' });

  currentY += 5;
  doc.text(`Payment Mode: ${paymentMethod}`, pageWidth - margin, currentY, { align: 'right' });

  currentY += 5;
  doc.text(`Service Mode: ${booking.mode === 'pickup' ? 'Doorstep Pickup Wash' : 'Center Drive-In Slot'}`, pageWidth - margin, currentY, { align: 'right' });

  // 3. TWO-COLUMN BOX FOR CUSTOMER & VEHICLE DETAILS
  currentY += 6;
  const boxHeight = 32;

  // Box background
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, currentY, contentWidth, boxHeight, 3, 3, 'FD');

  // Customer Side (Left)
  const colX1 = margin + 5;
  let boxY = currentY + 7;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('CUSTOMER DETAILS', colX1, boxY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  boxY += 6;
  doc.text(`Name: ${booking.name}`, colX1, boxY);
  boxY += 5;
  doc.text(`Phone: +91 ${booking.phone}`, colX1, boxY);
  if (booking.address) {
    boxY += 5;
    doc.text(`Pickup Address: ${booking.address.substring(0, 42)}`, colX1, boxY);
  }

  // Vehicle Side (Right)
  const colX2 = margin + contentWidth / 2 + 5;
  boxY = currentY + 7;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('VEHICLE & SLOT DETAILS', colX2, boxY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  boxY += 6;
  doc.text(`Vehicle Type: ${booking.vehicleType}`, colX2, boxY);
  boxY += 5;
  doc.text(`Model / Reg No: ${booking.vehicleModel}`, colX2, boxY);
  if (booking.timeSlot || booking.timeWindow) {
    boxY += 5;
    doc.text(`Preferred Time: ${booking.timeSlot || booking.timeWindow}`, colX2, boxY);
  }

  // 4. ITEMIZED SERVICE TABLE
  currentY += boxHeight + 8;

  const totalAmountVal = booking.totalAmount || getEstimatedPrice(booking.vehicleType);

  const tableRows = [
    [
      '1',
      `Full Water & Snow Foam Wash (${booking.vehicleType})`,
      `${booking.vehicleModel}`,
      `Rs. ${totalAmountVal}.00`
    ]
  ];

  if (booking.addOns && booking.addOns.length > 0) {
    booking.addOns.forEach((addon, idx) => {
      tableRows.push([
        `${idx + 2}`,
        `Add-on: ${getAddonName(addon)}`,
        'Confirmed on wash',
        'Included'
      ]);
    });
  }

  // Free Perks Row
  tableRows.push([
    `${tableRows.length + 1}`,
    'Complimentary Pack (Chilled Water Bottle + Car Tissue Box)',
    'Because We Care Perk',
    'FREE'
  ]);

  autoTable(doc, {
    startY: currentY,
    head: [['#', 'Service Description', 'Vehicle / Note', 'Amount']],
    body: tableRows,
    theme: 'striped',
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      cellPadding: 3.5,
    },
    bodyStyles: {
      fontSize: 8.5,
      textColor: [51, 65, 85],
      cellPadding: 3.5,
    },
    columnStyles: {
      0: { cellWidth: 12, halign: 'center' },
      1: { cellWidth: 96 },
      2: { cellWidth: 42 },
      3: { cellWidth: 28, halign: 'right', fontStyle: 'bold' },
    },
    margin: { left: margin, right: margin },
  });

  // @ts-ignore
  const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : currentY + 50;

  // 5. TOTAL SUMMARY BOX & PAYMENT STATUS
  const totalBoxWidth = 84;
  const totalBoxX = pageWidth - margin - totalBoxWidth;

  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(totalBoxX, finalY, totalBoxWidth, 24, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`GRAND TOTAL: Rs. ${totalAmountVal}.00`, totalBoxX + 5, finalY + 8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(16, 185, 129); // Emerald
  doc.text(`Payment: PAID (${paymentMethod})`, totalBoxX + 5, finalY + 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Status: COMPLETED / DELIVERED', totalBoxX + 5, finalY + 19);

  // Left side signature attribution line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(`Billed By: ${billedBy}`, margin, finalY + 8);
  doc.text(`Timestamp: ${formattedDateTimeWithSeconds}`, margin, finalY + 14);
  doc.text(`Payment Mode: ${paymentMethod}`, margin, finalY + 19);

  // 6. FOOTER THANK YOU & DIRECTORY
  const footerY = 270;

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(margin, footerY, pageWidth - margin, footerY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(16, 185, 129);
  doc.text('Thank you for choosing MS Car Wash — Clean Car, Happy Ride!', pageWidth / 2, footerY + 7, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('For queries or appointments: Call +91 9494829450, 8309390902 | WhatsApp: +91 8885426155', pageWidth / 2, footerY + 12, { align: 'center' });

  const fileName = `MSCW_Invoice_${booking.id}.pdf`;
  const blob = doc.output('blob');
  const blobUrl = URL.createObjectURL(blob);

  const download = () => {
    doc.save(fileName);
  };

  if (autoSave) {
    download();
  }

  return { doc, blobUrl, download, fileName };
}

function getEstimatedPrice(type: string): number {
  if (type === 'Bike' || type === 'Scooter') return 100;
  if (type === 'Car' || type === 'Hatchback') return 350;
  if (type === 'Sedan') return 450;
  if (type === 'SUV' || type === 'Compact SUV') return 600;
  return 350;
}

function getAddonName(addonId: string): string {
  switch (addonId) {
    case 'interior': return 'Interior Cleaning & Sanitization';
    case 'polish': return 'Polish & Body Shine';
    case 'pressure': return 'Underbody High-Pressure Wash';
    default: return addonId;
  }
}
