/* ===== EDIT THIS PART ===== */
const NAME = "Sa Baby kong maangas";
const GATE_ON = true; // true = she must answer the question before the gift opens
const GATE_Q = "When did we become a couple?"; // the answer comes from START_DATE below (many date formats accepted)
const VOICE_FILE = ""; // voice message: "voice.mp3" next to this file, or a full URL. Empty = hidden (add ?dev to the link to preview)
const ENVELOPES = [ // "Open when..." notes: edit freely
  {t:"Open when you're tired after duty", n:"Sit down, take your shoes off, breathe. You took care of so many people today. Now it's my turn to be proud of you. Rest, love. I'll be here when you wake up."},
  {t:"Open when you miss me", n:"Look up at the same sky as me. I'm thinking of you right now, promise. Hug Teitei tight until I can hug you for real."},
  {t:"Open when you're sungit", n:"Okay, okay, I know I'm probably the reason. I'm sorry. Take a deep breath, drink some water, and come cuddle me. Sungit level: 12%, remember?"},
  {t:"Open when you can't sleep", n:"Close your eyes and picture us in Baguio, wrapped in blankets while the fog rolls in. Teitei is already asleep. Goodnight, love."},
  {t:"Open when you doubt yourself", n:"You are smart, you are strong, and you are doing better than you think. The people you care for are lucky to have you. I am the luckiest."}
];
const START_DATE = "2025-12-16"; // the day you became a couple
const PHOTOS = [ // gallery photos, hosted on Supabase storage (edit captions freely)
  {src:"https://yamlxgwmwzahovbjpnjc.supabase.co/storage/v1/object/public/birthday_ng_bebe/gallary/first_date.jpg", cap:"Our first date", emoji:"💗"},
  {src:"https://yamlxgwmwzahovbjpnjc.supabase.co/storage/v1/object/public/birthday_ng_bebe/gallary/us_1.jpg", cap:"Just us", emoji:"🥰"},
  {src:"https://yamlxgwmwzahovbjpnjc.supabase.co/storage/v1/object/public/birthday_ng_bebe/gallary/us_on_call.jpg", cap:"Us on call", emoji:"📱"},
  {src:"https://yamlxgwmwzahovbjpnjc.supabase.co/storage/v1/object/public/birthday_ng_bebe/gallary/cute_us.jpg", cap:"Cute us", emoji:"🌸"},
  {src:"https://yamlxgwmwzahovbjpnjc.supabase.co/storage/v1/object/public/birthday_ng_bebe/gallary/favorite_smile.jpg", cap:"My favorite smile", emoji:"😊"},
  {src:"https://yamlxgwmwzahovbjpnjc.supabase.co/storage/v1/object/public/birthday_ng_bebe/gallary/us_2.jpg", cap:"Us again", emoji:"💕"},
  {src:"https://yamlxgwmwzahovbjpnjc.supabase.co/storage/v1/object/public/birthday_ng_bebe/gallary/my_baddie_baby.jpg", cap:"My baddie baby", emoji:"😎"},
  {src:"https://yamlxgwmwzahovbjpnjc.supabase.co/storage/v1/object/public/birthday_ng_bebe/gallary/us_on_church.jpg", cap:"Us at church", emoji:"⛪"},
  {src:"https://yamlxgwmwzahovbjpnjc.supabase.co/storage/v1/object/public/birthday_ng_bebe/gallary/teitei.jpg", cap:"Teitei!", emoji:"🐘"},
  {src:"https://yamlxgwmwzahovbjpnjc.supabase.co/storage/v1/object/public/birthday_ng_bebe/gallary/us_3.jpg", cap:"Always us", emoji:"💖"},
  {src:"https://yamlxgwmwzahovbjpnjc.supabase.co/storage/v1/object/public/birthday_ng_bebe/gallary/hironos.jpg", cap:"Hironos", emoji:"🌷"},
  {src:"https://yamlxgwmwzahovbjpnjc.supabase.co/storage/v1/object/public/birthday_ng_bebe/gallary/out_babies.jpg", cap:"Our babies", emoji:"✨"},
  {src:"https://yamlxgwmwzahovbjpnjc.supabase.co/storage/v1/object/public/birthday_ng_bebe/gallary/us_4.jpg", cap:"Us, always", emoji:"💞"},
  {src:"https://yamlxgwmwzahovbjpnjc.supabase.co/storage/v1/object/public/birthday_ng_bebe/gallary/out_shoeee.jpg", cap:"Shoeee!", emoji:"👟"},
  {src:"https://yamlxgwmwzahovbjpnjc.supabase.co/storage/v1/object/public/birthday_ng_bebe/gallary/hahaha_nasend_sa_gc.jpg", cap:"Hahaha, nasend sa GC", emoji:"🤭"},
  {src:"https://yamlxgwmwzahovbjpnjc.supabase.co/storage/v1/object/public/birthday_ng_bebe/gallary/us_5.jpg", cap:"Still us", emoji:"💗"},
  {src:"https://yamlxgwmwzahovbjpnjc.supabase.co/storage/v1/object/public/birthday_ng_bebe/gallary/us_6.jpg", cap:"Us and more us", emoji:"🥰"},
  {src:"https://yamlxgwmwzahovbjpnjc.supabase.co/storage/v1/object/public/birthday_ng_bebe/gallary/your_certified_tagabit_bit_ng_bags.jpg", cap:"Your certified tagabitbit ng bags", emoji:"👜"},
  {src:"https://yamlxgwmwzahovbjpnjc.supabase.co/storage/v1/object/public/birthday_ng_bebe/gallary/us_7.jpg", cap:"Us, hehe", emoji:"💕"},
  {src:"https://yamlxgwmwzahovbjpnjc.supabase.co/storage/v1/object/public/birthday_ng_bebe/gallary/us_8.jpg", cap:"Just us two", emoji:"💖"},
  {src:"https://yamlxgwmwzahovbjpnjc.supabase.co/storage/v1/object/public/birthday_ng_bebe/gallary/us_together.jpg", cap:"Together", emoji:"🤍"}
];
const DANCER_PHOTO = "https://yamlxgwmwzahovbjpnjc.supabase.co/storage/v1/object/public/birthday_ng_bebe/gallary/dancing_me.jpg"; // paste your photo URL here (or "photos/me.jpg"). Empty = the classic Roblox smile
const SONG_FILE = "https://yamlxgwmwzahovbjpnjc.supabase.co/storage/v1/object/public/birthday_ng_bebe/music/Maligayang%20bati%20-%20kambing%20and%20friends.mp3"; // the dance music: a full URL or "song.mp3" next to this file
const SONG_BPM = 130; // the song's tempo so the dance matches it (search "<song name> BPM")
const REASONS = [
  "You take care of everyone, and you still take care of me.",
  "Your laugh makes any bad day better.",
  "You are the cutest person I know.",
  "You work so hard and never stop caring.",
  "You make ordinary days feel special.",
  "You are my favorite person to come home to."
];
const LETTER = `Happy birthday, love!

I made this little place on the internet because you deserve something as sweet as you are.

Thank you for your patience, your care, and for being my home. I hope this year gives you all the rest, joy, and love you give to everyone else.

I love you, today and always.

Love,
your boyfriend and Teitei 🐘`;
/* ========================== */
