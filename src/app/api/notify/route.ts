import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const booking = await req.json();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const primaryChatId = process.env.TELEGRAM_CHAT_ID || '';
    const secondaryChatId = process.env.TELEGRAM_CHAT_ID_2 || '';

    // Collect all unique chat IDs (supports comma-separated string or secondary env var)
    const rawIds = `${primaryChatId},${secondaryChatId}`.split(',');
    const chatIds = Array.from(new Set(rawIds.map(id => id.trim()).filter(Boolean)));

    if (botToken && chatIds.length > 0) {
      const cleanPhone = (booking.phone || '').replace(/\D/g, '');
      const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
      const modeTitle = booking.mode === 'pickup' ? '🚪 Doorstep Pickup & Drop' : '🚗 Center Slot Drive-In';
      const scheduleTime = booking.mode === 'pickup'
        ? (booking.timeWindow || 'Morning Pickup (8 AM - 12 PM)')
        : `${booking.date || 'Today'} @ ${booking.timeSlot}`;

      const message = `🧼 *NEW CAR WASH REQUEST RECEIVED!*
━━━━━━━━━━━━━━━━━━━━━━
🆔 *Booking ID:* \`#${booking.id || 'MSCW-NEW'}\`
⚡ *Service:* *${modeTitle}*
💰 *Est. Price:* *₹${booking.totalAmount || 350}*

👤 *CUSTOMER DETAILS*
• *Name:* *${booking.name}*
• *Phone:* \`+91 ${booking.phone}\`
${booking.address ? `• *Pickup Address:* _${booking.address}_` : ''}

🚘 *VEHICLE & SCHEDULE*
• *Vehicle:* *${booking.vehicleType}* (${booking.vehicleModel})
• *Requested Time:* *${scheduleTime}*
${booking.addOns && booking.addOns.length > 0 ? `• *Add-Ons:* _${booking.addOns.join(', ')}_` : ''}
${booking.notes ? `• *Customer Notes:* _"${booking.notes}"_` : ''}

━━━━━━━━━━━━━━━━━━━━━━
📍 *MS Car Wash — Srikalahasti Desk*`;

      // Build inline buttons for 1-click WhatsApp & Google Maps navigation
      const inlineButtons: Array<Array<{ text: string; url: string }>> = [
        [
          {
            text: '💬 WhatsApp Customer',
            url: `https://wa.me/${waPhone}?text=${encodeURIComponent(`Hello ${booking.name}, regarding your MS Car Wash booking #${booking.id}...`)}`,
          },
        ],
      ];

      if (booking.address) {
        inlineButtons.push([
          {
            text: '📍 Open Pickup Location on Maps',
            url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${booking.address}, Srikalahasti`)}`,
          },
        ]);
      }

      // Send to all chat IDs in parallel with inline buttons
      await Promise.all(
        chatIds.map(chatId =>
          fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: message,
              parse_mode: 'Markdown',
              reply_markup: {
                inline_keyboard: inlineButtons,
              },
            }),
          }).catch(err => console.error(`Telegram error for chat_id ${chatId}:`, err))
        )
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Telegram notification error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
