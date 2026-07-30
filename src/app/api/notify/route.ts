import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const booking = await req.json();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const message = `🚗 *NEW WASH BOOKING — MS CAR WASH*
----------------------------------
*Booking ID*: ${booking.id || 'N/A'}
*Customer*: ${booking.name}
*Phone*: ${booking.phone}
*Vehicle*: ${booking.vehicleType} - ${booking.vehicleModel}
*Type*: ${booking.mode === 'pickup' ? 'Doorstep Pickup' : 'Center Drive-In Slot'}
*Time/Slot*: ${booking.mode === 'pickup' ? (booking.timeWindow || 'Morning') : `${booking.date || 'Today'} (${booking.timeSlot})`}
${booking.address ? `*Address*: ${booking.address}` : ''}
${booking.notes ? `*Notes*: ${booking.notes}` : ''}
----------------------------------
📍 *MS Car Wash Srikalahasti*`;

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Telegram notification error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
