import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Booking } from './types';

export interface JobCardData {
  fuelLevel: string; // '25%', '50%', '75%', '100%'
  odometer: string; // e.g. '42,500 KM'
  regNumber: string; // e.g. 'AP 39 AB 1234'
  mechanicAssigned: string;
  scratchNotes: string;
  hasValuablesRemoved: boolean;
  promisedTime: string;
  estimatedCost: number;
}

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

export async function generateJobCardPDF(
  booking: Booking,
  details: JobCardData,
  autoSave: boolean = true
): Promise<{ doc: jsPDF; blobUrl: string; download: () => void; fileName: string }> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // 1. Primary Header Banner
  doc.setFillColor(15, 23, 42); // Deep Slate (#0f172a)
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Emerald accent top line
  doc.setFillColor(16, 185, 129); // Emerald 500
  doc.rect(0, 0, pageWidth, 3.5, 'F');

  // Logo
  const logoDataUrl = await getLogoDataUrl();
  if (logoDataUrl) {
    try {
      doc.addImage(logoDataUrl, 'PNG', 14, 8, 26, 26);
    } catch {
      // ignore
    }
  }

  // Header Title
  const textStartX = logoDataUrl ? 45 : 15;
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('MS CAR MECHANIC & CAR WASH', textStartX, 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225);
  doc.text('VEHICLE INTAKE JOB CARD & INSPECTION SLIP', textStartX, 22);
  doc.text('Panagal, Opp Old RTO Office, Beside Bharat Petroleum, Srikalahasti - 517644', textStartX, 27);
  doc.text('Phone & WhatsApp: +91 8309390902', textStartX, 32);

  // Job Card Badge
  doc.setFillColor(16, 185, 129);
  doc.roundedRect(pageWidth - 55, 11, 41, 16, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`JOB CARD`, pageWidth - 34.5, 18, { align: 'center' });
  doc.setFontSize(8);
  doc.text(`#${booking.id}`, pageWidth - 34.5, 23, { align: 'center' });

  // 2. Metadata Box
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, 48, pageWidth - 28, 38, 2, 2, 'FD');

  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'bold');
  doc.text('CUSTOMER & VEHICLE DETAILS', 18, 55);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text(`Customer Name:`, 18, 62);
  doc.setFont('helvetica', 'bold');
  doc.text(`${booking.name || 'Walk-in Customer'}`, 52, 62);

  doc.setFont('helvetica', 'normal');
  doc.text(`Contact Phone:`, 18, 68);
  doc.setFont('helvetica', 'bold');
  doc.text(`+91 ${booking.phone}`, 52, 68);

  doc.setFont('helvetica', 'normal');
  doc.text(`Vehicle Type:`, 18, 74);
  doc.setFont('helvetica', 'bold');
  doc.text(`${booking.vehicleType} (${booking.vehicleModel})`, 52, 74);

  doc.setFont('helvetica', 'normal');
  doc.text(`Registration No:`, 18, 80);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129);
  doc.text(`${details.regNumber || 'Not Mentioned'}`, 52, 80);

  // Right column of details
  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date & Time:`, 115, 62);
  doc.setFont('helvetica', 'bold');
  doc.text(`${new Date().toLocaleString('en-IN')}`, 148, 62);

  doc.setFont('helvetica', 'normal');
  doc.text(`Fuel Level:`, 115, 68);
  doc.setFont('helvetica', 'bold');
  doc.text(`${details.fuelLevel}`, 148, 68);

  doc.setFont('helvetica', 'normal');
  doc.text(`Odometer (KM):`, 115, 74);
  doc.setFont('helvetica', 'bold');
  doc.text(`${details.odometer || 'Not Recorded'}`, 148, 74);

  doc.setFont('helvetica', 'normal');
  doc.text(`Mechanic Assigned:`, 115, 80);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(99, 102, 241);
  doc.text(`${details.mechanicAssigned}`, 148, 80);

  // 3. Work Order & Inspection Checklist Table
  const checklistRows = [
    ['1', 'Service Scope', booking.notes || 'Full Wash / Standard Inspection', 'Confirmed'],
    ['2', 'Visual Scratches & Dents', details.scratchNotes || 'No major dents noted at intake', 'Checked'],
    ['3', 'Valuables & Dash Items', details.hasValuablesRemoved ? 'Removed by Customer' : 'None Left Behind', 'Verified'],
    ['4', 'Estimated Delivery Time', details.promisedTime || 'Within 2 Hours', 'Targeted'],
    ['5', 'Estimated Service Cost', `INR ${details.estimatedCost || booking.totalAmount || 350}`, 'Approved'],
  ];

  autoTable(doc, {
    startY: 92,
    head: [['#', 'Checklist Item', 'Particulars & Customer Declaration', 'Status']],
    body: checklistRows,
    theme: 'grid',
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: 'bold',
      halign: 'left',
    },
    bodyStyles: {
      fontSize: 8.5,
      textColor: [30, 41, 59],
      cellPadding: 3.5,
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 45, fontStyle: 'bold' },
      2: { cellWidth: 100 },
      3: { cellWidth: 25, halign: 'center', fontStyle: 'bold', textColor: [16, 185, 129] },
    },
    margin: { left: 14, right: 14 },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finalY = (doc as any).lastAutoTable?.finalY || 160;

  // 4. Customer Free Perks Box
  doc.setFillColor(254, 243, 199); // Amber 100
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(14, finalY + 8, pageWidth - 28, 18, 2, 2, 'FD');

  doc.setTextColor(146, 64, 14);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('COMPLIMENTARY CUSTOMER PERKS INCLUDED:', 18, finalY + 15);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('1 Chilled Sealed Mineral Water Bottle + 1 Car Dashboard Tissue Paper Box included free.', 18, finalY + 21);

  // 5. Terms & Signatures
  const signY = finalY + 38;
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text(
    'Disclaimer: MS Car Mechanic & Car Wash is not liable for personal cash/jewelry left in the car. Please inspect on delivery.',
    14,
    signY
  );

  // Signature Lines
  doc.setDrawColor(203, 213, 225);
  doc.line(20, signY + 28, 75, signY + 28);
  doc.line(pageWidth - 75, signY + 28, pageWidth - 20, signY + 28);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);
  doc.text('Customer Signature', 47.5, signY + 33, { align: 'center' });
  doc.text('Authorized Workshop Sign', pageWidth - 47.5, signY + 33, { align: 'center' });

  // 6. Footer
  const footerY = doc.internal.pageSize.getHeight() - 12;
  doc.setFillColor(15, 23, 42);
  doc.rect(0, footerY - 4, pageWidth, 16, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(
    'MS Car Mechanic & Car Wash Srikalahasti | Phone & WhatsApp: +91 8309390902',
    pageWidth / 2,
    footerY + 2,
    { align: 'center' }
  );

  const fileName = `JobCard_${booking.id}_${(details.regNumber || 'Vehicle').replace(/\s+/g, '_')}.pdf`;
  const blobUrl = doc.output('bloburl').toString();

  const download = () => {
    doc.save(fileName);
  };

  if (autoSave && typeof window !== 'undefined') {
    doc.save(fileName);
  }

  return { doc, blobUrl, download, fileName };
}
