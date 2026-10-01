/* Little Mantras — offline PWA teaching mantras to children aged 3–5. No external resources. */
(function () {
'use strict';

/* ------------------------------------------------------------------ */
/* Content (texts checked against: Wikipedia / Vedapath (RV 3.62.10,  */
/* RV 7.59.12), shlokam.org, sanskritdocuments.org hanuman40, stotra.in,*/
/* adiveda.in). Chalisa follows the common Gita Press readings.         */
/* ------------------------------------------------------------------ */
const L = (deva, roman, words, meaning, extra) => Object.assign({ deva, roman, words, meaning }, extra || {});
const CH = [ /* [devanagari half 1, half 2, roman half 1, half 2, meaning] */
  ['श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि', 'बरनउँ रघुबर बिमल जसु जो दायकु फल चारि', 'Shri Guru charan saroj raj nij manu mukuru sudhari', 'Barnaun Raghubar bimal jasu jo dayaku phal chari', 'With the dust of my Guru’s lotus feet I clean the mirror of my mind, and sing Lord Rama’s pure glory, which gives every good thing.'],
  ['बुद्धिहीन तनु जानिके सुमिरौं पवनकुमार', 'बल बुद्धि बिद्या देहु मोहिं हरहु कलेस बिकार', 'Buddhiheen tanu janike sumirau Pavan Kumar', 'Bal buddhi bidya dehu mohin harahu kalesh bikar', 'Knowing I need help, I think of Hanuman, son of the Wind: please give me strength, wisdom and learning, and take away my troubles.'],
  ['जय हनुमान ज्ञान गुन सागर', 'जय कपीस तिहुँ लोक उजागर', 'Jai Hanuman gyan gun sagar', 'Jai Kapees tihun lok ujagar', 'Hail Hanuman, an ocean of wisdom and goodness! Hail the monkey king who lights up all three worlds!'],
  ['राम दूत अतुलित बल धामा', 'अंजनिपुत्र पवनसुत नामा', 'Ram doot atulit bal dhama', 'Anjani putra Pavan sut nama', 'You are Rama’s messenger, full of matchless strength, called Anjani’s son and son of the Wind.'],
  ['महाबीर बिक्रम बजरंगी', 'कुमति निवार सुमति के संगी', 'Mahabeer bikram Bajrangi', 'Kumati nivar sumati ke sangi', 'Great brave hero, strong as a thunderbolt, you chase away bad thoughts and stay with good ones.'],
  ['कंचन बरन बिराज सुबेसा', 'कानन कुंडल कुंचित केसा', 'Kanchan baran biraj subesa', 'Kanan kundal kunchit kesa', 'Your body shines like gold and you are beautifully dressed, with earrings and curly hair.'],
  ['हाथ बज्र औ ध्वजा बिराजै', 'काँधे मूँज जनेऊ साजै', 'Hath bajra au dhvaja birajai', 'Kandhe moonj janeu sajai', 'A mighty vajra and a flag shine in your hands, and a sacred thread of munja grass sits on your shoulder.'],
  ['संकर सुवन केसरीनंदन', 'तेज प्रताप महा जग बंदन', 'Sankar suvan Kesari nandan', 'Tej pratap maha jag bandan', 'You are a part of Lord Shiva and the son of Kesari; the whole world bows to your shining glory.'],
  ['बिद्यावान गुनी अति चातुर', 'राम काज करिबे को आतुर', 'Bidyavan guni ati chatur', 'Ram kaj karibe ko aatur', 'You are learned, good and very clever, always eager to do Rama’s work.'],
  ['प्रभु चरित्र सुनिबे को रसिया', 'राम लखन सीता मन बसिया', 'Prabhu charitra sunibe ko rasiya', 'Ram Lakhan Sita man basiya', 'You love to hear Lord Rama’s stories; Rama, Lakshmana and Sita live in your heart.'],
  ['सूक्ष्म रूप धरि सियहिं दिखावा', 'बिकट रूप धरि लंक जरावा', 'Sukshma roop dhari Siyahin dikhava', 'Bikat roop dhari Lank jarava', 'You became tiny to meet Sita, and became huge to set Lanka on fire.'],
  ['भीम रूप धरि असुर सँहारे', 'रामचंद्र के काज सँवारे', 'Bheem roop dhari asur sanhare', 'Ramachandra ke kaj sanvare', 'Taking a mighty form you defeated the demons and finished Lord Rama’s tasks.'],
  ['लाय सजीवन लखन जियाये', 'श्रीरघुबीर हरषि उर लाये', 'Laye Sajeevan Lakhan jiyaye', 'Shri Raghubeer harashi ur laye', 'You brought the life-giving herb and saved Lakshmana; happy Rama hugged you close.'],
  ['रघुपति कीन्ही बहुत बड़ाई', 'तुम मम प्रिय भरतहि सम भाई', 'Raghupati keenhi bahut badai', 'Tum mam priya Bharatahi sam bhai', 'Rama praised you a lot: “You are as dear to me as my brother Bharata.”'],
  ['सहस बदन तुम्हरो जस गावैं', 'अस कहि श्रीपति कंठ लगावैं', 'Sahas badan tumharo jas gavain', 'As kahi Shripati kanth lagavain', '“A thousand mouths sing your glory,” said Rama, and hugged you.'],
  ['सनकादिक ब्रह्मादि मुनीसा', 'नारद सारद सहित अहीसा', 'Sanakadik Brahmadi muneesa', 'Narad Sarad sahit Aheesa', 'Great sages like Sanaka, Lord Brahma, Narada, Saraswati and the king of serpents all sing your praise…'],
  ['जम कुबेर दिगपाल जहाँ ते', 'कबि कोबिद कहि सके कहाँ ते', 'Jam Kuber Digpal jahan te', 'Kabi kobid kahi sake kahan te', '…even Yama, Kubera and the guardians of every direction. How could poets and scholars ever say it all?'],
  ['तुम उपकार सुग्रीवहिं कीन्हा', 'राम मिलाय राज पद दीन्हा', 'Tum upkar Sugreevahin keenha', 'Ram milaye raj pad deenha', 'You helped Sugriva: you brought him to Rama, and he became king.'],
  ['तुम्हरो मंत्र बिभीषन माना', 'लंकेस्वर भए सब जग जाना', 'Tumharo mantra Bibheeshan mana', 'Lankeshvar bhaye sab jag jana', 'Vibhishana followed your advice and became king of Lanka, as the whole world knows.'],
  ['जुग सहस्र जोजन पर भानू', 'लील्यो ताहि मधुर फल जानू', 'Jug sahastra jojan par Bhanu', 'Leelyo tahi madhur phal janu', 'The Sun is very, very far away, yet as a baby you tried to swallow it, thinking it was a sweet fruit!'],
  ['प्रभु मुद्रिका मेलि मुख माहीं', 'जलधि लाँघि गये अचरज नाहीं', 'Prabhu mudrika meli mukh mahin', 'Jaladhi langhi gaye acharaj nahin', 'With Rama’s ring in your mouth you leapt across the ocean – no wonder at all for you!'],
  ['दुर्गम काज जगत के जेते', 'सुगम अनुग्रह तुम्हरे तेते', 'Durgam kaj jagat ke jete', 'Sugam anugraha tumhare tete', 'Every hard job in the world becomes easy with your kindness.'],
  ['राम दुआरे तुम रखवारे', 'होत न आज्ञा बिनु पैसारे', 'Ram duare tum rakhvare', 'Hot na agya binu paisare', 'You guard Rama’s door; no one goes in without your permission.'],
  ['सब सुख लहै तुम्हारी सरना', 'तुम रच्छक काहू को डर ना', 'Sab sukh lahai tumhari sarna', 'Tum rakshak kahu ko dar na', 'Those who come to you find every happiness; with you to protect us, there is nothing to fear.'],
  ['आपन तेज सम्हारो आपै', 'तीनों लोक हाँक तें काँपै', 'Aapan tej samharo aapai', 'Teenon lok hank te kanpai', 'Only you can hold your great power; when you roar, all three worlds tremble.'],
  ['भूत पिसाच निकट नहिं आवै', 'महाबीर जब नाम सुनावै', 'Bhoot pisach nikat nahin aavai', 'Mahabeer jab naam sunavai', 'No spooky spirits come near when we say the name of mighty Hanuman.'],
  ['नासै रोग हरै सब पीरा', 'जपत निरंतर हनुमत बीरा', 'Nasai rog harai sab peera', 'Japat nirantar Hanumat beera', 'Illness and pain go away when we keep chanting brave Hanuman’s name.'],
  ['संकट तें हनुमान छुड़ावै', 'मन क्रम बचन ध्यान जो लावै', 'Sankat te Hanuman chhudavai', 'Man kram bachan dhyan jo lavai', 'Hanuman frees from trouble everyone who remembers him in thoughts, actions and words.'],
  ['सब पर राम तपस्वी राजा', 'तिन के काज सकल तुम साजा', 'Sab par Ram tapasvi raja', 'Tin ke kaj sakal tum saja', 'Rama, the wise king, is greatest of all, and you did all his work.'],
  ['और मनोरथ जो कोई लावै', 'सोइ अमित जीवन फल पावै', 'Aur manorath jo koi lavai', 'Soi amit jeevan phal pavai', 'Whoever brings a wish to you receives endless blessings in life.'],
  ['चारों जुग परताप तुम्हारा', 'है परसिद्ध जगत उजियारा', 'Charon jug partap tumhara', 'Hai parsiddh jagat ujiyara', 'Your glory shines through all four ages; your light is famous across the world.'],
  ['साधु संत के तुम रखवारे', 'असुर निकंदन राम दुलारे', 'Sadhu sant ke tum rakhvare', 'Asur nikandan Ram dulare', 'You protect good and holy people, defeat the demons, and are Rama’s darling.'],
  ['अष्ट सिद्धि नौ निधि के दाता', 'अस बर दीन जानकी माता', 'Ashta siddhi nau nidhi ke data', 'As bar deen Janaki mata', 'Mother Sita blessed you so that you can give eight special powers and nine treasures.'],
  ['राम रसायन तुम्हरे पासा', 'सदा रहो रघुपति के दासा', 'Ram rasayan tumhare pasa', 'Sada raho Raghupati ke dasa', 'You keep the sweet medicine of Rama’s name, and you are always Rama’s loving helper.'],
  ['तुम्हरे भजन राम को पावै', 'जनम जनम के दुख बिसरावै', 'Tumhare bhajan Ram ko pavai', 'Janam janam ke dukh bisravai', 'Singing to you, we reach Rama and forget the sorrows of many lifetimes.'],
  ['अंत काल रघुबर पुर जाई', 'जहाँ जन्म हरिभक्त कहाई', 'Ant kaal Raghubar pur jaai', 'Jahan janam Hari-bhakt kahai', 'At life’s end they go to Rama’s home, and wherever they are born they are called God’s devotees.'],
  ['और देवता चित्त न धरई', 'हनुमत सेइ सर्ब सुख करई', 'Aur devata chitt na dharai', 'Hanumat sei sarba sukh karai', 'Even without thinking of any other god, loving Hanuman brings every happiness.'],
  ['संकट कटै मिटै सब पीरा', 'जो सुमिरै हनुमत बलबीरा', 'Sankat katai mitai sab peera', 'Jo sumirai Hanumat balbeera', 'Troubles are cut away and all pain goes for those who remember strong, brave Hanuman.'],
  ['जै जै जै हनुमान गोसाईं', 'कृपा करहु गुरुदेव की नाईं', 'Jai jai jai Hanuman Gosain', 'Kripa karahu Gurudev ki nain', 'Victory, victory, victory to Lord Hanuman! Please be kind to us like a loving teacher.'],
  ['जो सत बार पाठ कर कोई', 'छूटहि बंदि महा सुख होई', 'Jo sat baar path kar koi', 'Chhootahi bandi maha sukh hoi', 'Whoever says this a hundred times is set free and finds great joy.'],
  ['जो यह पढ़ै हनुमान चालीसा', 'होय सिद्धि साखी गौरीसा', 'Jo yah padhai Hanuman Chalisa', 'Hoy siddhi sakhi Gaureesa', 'Whoever reads this Hanuman Chalisa will do well – Lord Shiva is the witness.'],
  ['तुलसीदास सदा हरि चेरा', 'कीजै नाथ हृदय महँ डेरा', 'Tulsidas sada Hari chera', 'Keejai nath hriday mahan dera', 'Tulsidas is always God’s servant: “Lord, please make your home in my heart.”'],
  ['पवनतनय संकट हरन मंगल मूरति रूप', 'राम लखन सीता सहित हृदय बसहु सुर भूप', 'Pavan tanay sankat haran mangal moorati roop', 'Ram Lakhan Sita sahit hriday basahu sur bhoop', 'Son of the Wind, remover of troubles, form of all that is good: please live in our hearts with Rama, Lakshmana and Sita.']
];
const chalisaLabel = i => i < 2 ? 'Doha ' + (i + 1) : i < 42 ? 'Chaupai ' + (i - 1) : 'Closing doha';
const chalisaShort = i => i < 2 ? 'D' + (i + 1) : i < 42 ? String(i - 1) : 'D3';

const MANTRAS = [
  { id: 'shiva', name: 'Om Namah Shivaya', deityName: 'Lord Shiva', deity: 'shiva', theme: ['#8FD3FF', '#3F86D6'],
    overall: 'Om! I bow to Lord Shiva, the kind and good one.',
    lines: [L('ॐ नमः शिवाय', 'Om Namah Shivaya', [['Om'], ['Na', 'mah'], ['Shi', 'vaa', 'ya']], 'Om! I bow to Lord Shiva, the kind and good one.')] },
  { id: 'gayatri', name: 'Gayatri Mantra', deityName: 'Surya Dev', deity: 'surya', theme: ['#FFD36B', '#FF8A1F'],
    overall: 'We pray to the bright Sun to make our minds clever and kind.',
    lines: [
      L('ॐ भूर्भुवः स्वः', 'Om Bhur Bhuvah Svah', [['Om'], ['Bhur'], ['Bhu', 'vah'], ['Svah']], 'Om! The earth, the sky and the heavens – everything, everywhere.', { pic: 'sunrise', tts: 'Om. Bhoor, bhoo vah, svah.' }),
      L('तत्सवितुर्वरेण्यं', 'Tat Savitur Varenyam', [['Tat'], ['Sa', 'vi', 'tur'], ['Va', 'ren', 'yam']], 'The shining Sun is so wonderful – the very best of all.', { pic: 'sun', tts: 'Tut, sa vi toor, va rayn yum.' }),
      L('भर्गो देवस्य धीमहि', 'Bhargo Devasya Dheemahi', [['Bhar', 'go'], ['De', 'vas', 'ya'], ['Dhee', 'ma', 'hi']], 'We sit quietly and think of its bright, holy light.', { pic: 'glow', tts: 'Bhar go, day vus ya, dhee ma hi.' }),
      L('धियो यो नः प्रचोदयात्', 'Dhiyo Yo Nah Prachodayat', [['Dhi', 'yo'], ['Yo'], ['Nah'], ['Pra', 'cho', 'da', 'yat']], 'May that light help our minds to be clever and kind.', { pic: 'idea', tts: 'Dhi yo, yo, nah, pra cho da yaat.' })
    ] },
  { id: 'ganesha', name: 'Ganesha Mantra', deityName: 'Lord Ganesha', deity: 'ganesha', theme: ['#FFB38A', '#F2653A'],
    overall: 'Dear Ganesha, please help everything I do go smoothly.',
    lines: [
      L('वक्रतुण्ड महाकाय', 'Vakratunda Mahakaya', [['Vak', 'ra', 'tun', 'da'], ['Ma', 'haa', 'kaa', 'ya']], 'O Ganesha, with your curved trunk and big, strong body,'),
      L('सूर्यकोटि समप्रभ', 'Suryakoti Samaprabha', [['Soor', 'ya', 'ko', 'ti'], ['Sa', 'ma', 'pra', 'bha']], 'you shine as brightly as millions of suns.'),
      L('निर्विघ्नं कुरु मे देव', 'Nirvighnam Kuru Me Deva', [['Nir', 'vigh', 'nam'], ['Ku', 'ru'], ['Me'], ['De', 'va']], 'Please, dear Lord, clear away everything in my way,'),
      L('सर्वकार्येषु सर्वदा', 'Sarvakaryeshu Sarvada', [['Sar', 'va', 'kaar', 'ye', 'shu'], ['Sar', 'va', 'daa']], 'in everything I do, always.')
    ] },
  { id: 'lakshmi', name: 'Lakshmi Mantra', deityName: 'Goddess Lakshmi', deity: 'lakshmi', theme: ['#FF9DB8', '#E0336B'],
    overall: 'Om! We bow to Mother Lakshmi, who blesses us with plenty and good fortune.',
    lines: [L('ॐ श्रीं महालक्ष्म्यै नमः', 'Om Shreem Mahalakshmyai Namah', [['Om'], ['Shreem'], ['Ma', 'haa', 'laksh', 'myai'], ['Na', 'mah']], 'Om! We bow to Mother Lakshmi, who blesses us with plenty and good fortune.')] },
  { id: 'saraswati', name: 'Saraswati Vandana', deityName: 'Goddess Saraswati', deity: 'saraswati', theme: ['#A7DBFF', '#4D8FE0'],
    overall: 'Dear Saraswati, I am starting to learn – please help me learn well, always.',
    lines: [
      L('सरस्वति नमस्तुभ्यं', 'Saraswati Namastubhyam', [['Sa', 'ras', 'va', 'ti'], ['Na', 'mas', 'tubh', 'yam']], 'Dear Saraswati, I bow to you.'),
      L('वरदे कामरूपिणि', 'Varade Kamarupini', [['Va', 'ra', 'de'], ['Kaa', 'ma', 'roo', 'pi', 'ni']], 'You give blessings and make good wishes come true.'),
      L('विद्यारम्भं करिष्यामि', 'Vidyarambham Karishyami', [['Vid', 'yaa', 'ram', 'bham'], ['Ka', 'rish', 'yaa', 'mi']], 'I am starting to learn today.'),
      L('सिद्धिर्भवतु मे सदा', 'Siddhirbhavatu Me Sada', [['Sid', 'dhir', 'bha', 'va', 'tu'], ['Me'], ['Sa', 'daa']], 'Please help me always learn well.')
    ] },
  { id: 'mrityunjaya', name: 'Mahamrityunjaya', deityName: 'Lord Shiva (Tryambaka)', deity: 'rudra', older: true, theme: ['#B9A4FF', '#6A4FD8'],
    overall: 'We pray to kind, three-eyed Lord Shiva to keep us healthy, safe and free from fear.',
    lines: [
      L('ॐ त्र्यम्बकं यजामहे', 'Om Tryambakam Yajamahe', [['Om'], ['Tryam', 'ba', 'kam'], ['Ya', 'jaa', 'ma', 'he']], 'Om! We pray to three-eyed Lord Shiva,'),
      L('सुगन्धिं पुष्टिवर्धनम्', 'Sugandhim Pushtivardhanam', [['Su', 'gan', 'dhim'], ['Push', 'ti', 'var', 'dha', 'nam']], 'who is sweet like a lovely fragrance and helps all living things grow strong.'),
      L('उर्वारुकमिव बन्धनान्', 'Urvarukamiva Bandhanan', [['Ur', 'vaa', 'ru', 'ka', 'mi', 'va'], ['Ban', 'dha', 'naan']], 'Like a ripe cucumber gently let go from its vine,'),
      L('मृत्योर्मुक्षीय माऽमृतात्', 'Mrityor Mukshiya Mamritat', [['Mrit', 'yor'], ['Muk', 'shee', 'ya'], ['Maa', 'mri', 'taat']], 'may he free us from the fear of death and keep us close to life that lasts forever.')
    ] },
  { id: 'chalisa', name: 'Hanuman Chalisa', deityName: 'Lord Hanuman', deity: 'hanuman', kind: 'chalisa', theme: ['#FFB067', '#E8541E'],
    overall: 'Forty verses by Tulsidas praising brave, kind Hanuman, Lord Rama’s greatest helper.',
    lines: CH.map((c, i) => ({ deva: c[0], deva2: c[1], roman: c[2] + ' / ' + c[3], halves: [c[2], c[3]],
      words: [c[2], c[3]].map(h => h.split(/\s+/)), meaning: c[4], label: chalisaLabel(i), short: chalisaShort(i), unit: 'word' })) }
];
MANTRAS.forEach(m => m.lines.forEach(Ln => {
  if (Ln.unit === 'word') { Ln.chunks = Ln.words.flat(); Ln.rows = Ln.words; }
  else { Ln.chunks = Ln.words.flat(); Ln.rows = null; }
  Ln.ttsDeva = Ln.deva2 ? Ln.deva + ' । ' + Ln.deva2 : Ln.deva;
}));
const MBY = {}; MANTRAS.forEach(m => { MBY[m.id] = m; });
const REPEAT_OPTIONS = [1, 3, 11, 21];
const recKeysFor = m => m.lines.map((_, i) => m.id + '/line' + i).concat(m.lines.length > 1 && m.kind !== 'chalisa' ? [m.id + '/full'] : []);

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const $ = (s, el) => (el || document).querySelector(s);
const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
const app = $('#app');
const overlay = $('#overlay');
const toastEl = $('#toast');
let uidN = 0;
const uid = () => 'u' + (++uidN);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmtTime = s => { s = Math.max(0, Math.round(s || 0)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };

/* ------------------------------------------------------------------ */
/* State (localStorage) with migration from the Gayatri-only v1 app    */
/* ------------------------------------------------------------------ */
const STORE_KEY = 'little-mantras-state-v2';
const OLD_KEY = 'gayatri-kids-state-v1';
const freshState = () => ({ stars: {}, practised: {}, flowers: {}, unlockAll: false, repeat: 3, lastNew: -1 });
function loadState() {
  let st = null;
  try { st = JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); } catch (e) { st = null; }
  if (!st) {
    st = freshState();
    try {
      const old = JSON.parse(localStorage.getItem(OLD_KEY) || 'null');
      if (old) {
        st.stars.gayatri = +old.stars || 0;
        if (Array.isArray(old.practised)) st.practised.gayatri = old.practised.map(Boolean);
        st.unlockAll = !!old.unlockAll;
        if (REPEAT_OPTIONS.indexOf(old.repeat) >= 0) st.repeat = old.repeat;
        localStorage.setItem(STORE_KEY, JSON.stringify(st));
        localStorage.removeItem(OLD_KEY);
      }
    } catch (e) { /* ignore */ }
  }
  const d = freshState();
  st = Object.assign(d, st);
  if (typeof st.stars !== 'object' || !st.stars) st.stars = {};
  if (typeof st.practised !== 'object' || !st.practised) st.practised = {};
  if (typeof st.flowers !== 'object' || !st.flowers) st.flowers = {};
  if (REPEAT_OPTIONS.indexOf(st.repeat) < 0) st.repeat = 3;
  return st;
}
let state = loadState();
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* storage blocked */ } }
const starsOf = id => +state.stars[id] || 0;
const totalStars = () => Object.keys(state.stars).reduce((a, k) => a + (+state.stars[k] || 0), 0);
const practisedOf = id => { if (!Array.isArray(state.practised[id])) state.practised[id] = []; return state.practised[id]; };
const isPractised = (id, i) => !!practisedOf(id)[i];
const unlocked = (id, i) => i === 0 || state.unlockAll || isPractised(id, i - 1);
const practisedCount = id => practisedOf(id).filter(Boolean).length;

/* ------------------------------------------------------------------ */
/* SVG art                                                             */
/* ------------------------------------------------------------------ */
function starPath(cx, cy, R, r, n) {
  n = n || 5; let d = '';
  for (let i = 0; i < n * 2; i++) {
    const a = -Math.PI / 2 + i * Math.PI / n, rad = i % 2 ? r : R;
    d += (i ? 'L' : 'M') + (cx + rad * Math.cos(a)).toFixed(1) + ' ' + (cy + rad * Math.sin(a)).toFixed(1);
  }
  return d + 'Z';
}
const ICON = {
  home: '<svg viewBox="0 0 48 48"><path d="M8 22 24 8l16 14v17a3 3 0 0 1-3 3h-8V31h-10v11h-8a3 3 0 0 1-3-3z" fill="#FF8A1F"/><rect x="20" y="31" width="8" height="11" rx="1" fill="#FFD27A"/></svg>',
  back: '<svg viewBox="0 0 48 48"><path d="M29 10 15 24l14 14" fill="none" stroke="#FF8A1F" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  play: '<svg viewBox="0 0 48 48"><path d="M16 9.5v29a2 2 0 0 0 3 1.7l23-14.5a2 2 0 0 0 0-3.4L19 7.8a2 2 0 0 0-3 1.7z" fill="currentColor"/></svg>',
  stop: '<svg viewBox="0 0 48 48"><rect x="11" y="11" width="26" height="26" rx="6" fill="currentColor"/></svg>',
  again: '<svg viewBox="0 0 48 48"><path d="M36 17a14 14 0 1 0 2 11" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><path d="M38 6v12H26" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  next: '<svg viewBox="0 0 48 48"><path d="M10 24h26M26 12l12 12-12 12" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  check: '<svg viewBox="0 0 48 48"><path d="M10 25l9 9 19-20" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  ear: '<svg viewBox="0 0 48 48"><path d="M8 28v-4a16 16 0 0 1 32 0v4" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><rect x="5" y="25" width="11" height="17" rx="5" fill="currentColor"/><rect x="32" y="25" width="11" height="17" rx="5" fill="currentColor"/></svg>',
  mic: '<svg viewBox="0 0 48 48"><rect x="16" y="4" width="16" height="26" rx="8" fill="currentColor"/><path d="M10 22a14 14 0 0 0 28 0" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="M24 36v7M16 44h16" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>',
  gear: '<svg viewBox="0 0 48 48"><path d="M24 15a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm17 12 4 3-4 7-5-2a17 17 0 0 1-5 3l-1 5h-8l-1-5a17 17 0 0 1-5-3l-5 2-4-7 4-3a17 17 0 0 1 0-6l-4-3 4-7 5 2a17 17 0 0 1 5-3l1-5h8l1 5a17 17 0 0 1 5 3l5-2 4 7-4 3a17 17 0 0 1 0 6z" fill="#B7794A"/></svg>',
  lock: '<svg viewBox="0 0 48 48"><rect x="9" y="21" width="30" height="22" rx="6" fill="#C9A27E"/><path d="M15 21v-6a9 9 0 0 1 18 0v6" fill="none" stroke="#C9A27E" stroke-width="5"/><circle cx="24" cy="32" r="3.5" fill="#fff"/></svg>',
  star: '<svg viewBox="0 0 48 48"><path d="' + starPath(24, 25.5, 21, 9.5) + '" fill="#FFC83D" stroke="#E8590C" stroke-width="2.5" stroke-linejoin="round"/></svg>',
  parent: '<svg viewBox="0 0 24 24"><circle cx="8" cy="7" r="3.2" fill="currentColor"/><circle cx="17" cy="9.5" r="2.4" fill="currentColor"/><path d="M2.5 20a5.5 5.5 0 0 1 11 0zM13 20a4 4 0 0 1 8 0z" fill="currentColor"/></svg>',
  recDot: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="currentColor"/></svg>',
  trash: '<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  playS: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>',
  stopS: '<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/></svg>'
};

const TILE_ICON = {
  listen: '<svg class="ic" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="rgba(255,255,255,.25)"/><path d="M22 58v-8a28 28 0 0 1 56 0v8" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/><rect x="15" y="52" width="20" height="30" rx="9" fill="#fff"/><rect x="65" y="52" width="20" height="30" rx="9" fill="#fff"/><path d="M44 36c3 4 3 10 0 14M52 32c5 6 5 16 0 22" fill="none" stroke="#FFF1C2" stroke-width="4" stroke-linecap="round" opacity=".9"/></svg>',
  learn: '<svg class="ic" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="rgba(255,255,255,.25)"/><path d="M50 30C40 23 26 22 16 25v48c10-3 24-2 34 5 10-7 24-8 34-5V25c-10-3-24-2-34 5z" fill="#fff"/><path d="M50 30v48" stroke="#F25581" stroke-width="4"/><path d="M24 36h18M24 46h18M24 56h14M58 36h18M58 46h18M58 56h14" stroke="#FFB3C7" stroke-width="4" stroke-linecap="round"/></svg>',
  stars: '<svg class="ic" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="rgba(255,255,255,.25)"/><path d="' + starPath(50, 54, 38, 17) + '" fill="#FFD54A" stroke="#fff" stroke-width="5" stroke-linejoin="round"/><circle cx="41" cy="50" r="3.5" fill="#6B3FD9"/><circle cx="59" cy="50" r="3.5" fill="#6B3FD9"/><path d="M42 60q8 7 16 0" fill="none" stroke="#6B3FD9" stroke-width="3.5" stroke-linecap="round"/><path d="' + starPath(84, 18, 9, 4) + '" fill="#fff"/><path d="' + starPath(16, 24, 6, 2.6) + '" fill="#fff"/></svg>'
};

function sunFace(cx, cy, r, u, opts) {
  opts = opts || {};
  const rays = [];
  for (let i = 0; i < 12; i++) {
    rays.push('<rect x="' + (cx - r * 0.12) + '" y="' + (cy - r * 1.62) + '" width="' + (r * 0.24) + '" height="' + (r * 0.5) + '" rx="' + (r * 0.12) + '" fill="' + (i % 2 ? '#FF8A1F' : '#FFB02E') + '" transform="rotate(' + (i * 30) + ' ' + cx + ' ' + cy + ')"/>');
  }
  const k = v => (+v).toFixed(1);
  return '<defs><radialGradient id="' + u + 'f" cx="42%" cy="38%" r="70%"><stop offset="0" stop-color="#FFF6B0"/><stop offset=".65" stop-color="#FFC83D"/><stop offset="1" stop-color="#FF9F1C"/></radialGradient></defs>' +
    '<g class="' + (opts.raysClass || 'rays') + '">' + rays.join('') + '</g>' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="url(#' + u + 'f)" stroke="#FF8A1F" stroke-width="' + k(r * 0.05) + '"/>' +
    '<g class="eyes"><ellipse cx="' + k(cx - r * 0.34) + '" cy="' + k(cy - r * 0.12) + '" rx="' + k(r * 0.12) + '" ry="' + k(r * 0.17) + '" fill="#5A2D0C"/><ellipse cx="' + k(cx + r * 0.34) + '" cy="' + k(cy - r * 0.12) + '" rx="' + k(r * 0.12) + '" ry="' + k(r * 0.17) + '" fill="#5A2D0C"/>' +
    '<circle cx="' + k(cx - r * 0.3) + '" cy="' + k(cy - r * 0.19) + '" r="' + k(r * 0.045) + '" fill="#fff"/><circle cx="' + k(cx + r * 0.38) + '" cy="' + k(cy - r * 0.19) + '" r="' + k(r * 0.045) + '" fill="#fff"/></g>' +
    '<circle cx="' + k(cx - r * 0.6) + '" cy="' + k(cy + r * 0.22) + '" r="' + k(r * 0.14) + '" fill="#FF6F91" opacity=".45"/><circle cx="' + k(cx + r * 0.6) + '" cy="' + k(cy + r * 0.22) + '" r="' + k(r * 0.14) + '" fill="#FF6F91" opacity=".45"/>' +
    '<path d="M' + k(cx - r * 0.38) + ' ' + k(cy + r * 0.26) + ' Q' + cx + ' ' + k(cy + r * 0.7) + ' ' + k(cx + r * 0.38) + ' ' + k(cy + r * 0.26) + '" fill="none" stroke="#5A2D0C" stroke-width="' + k(r * 0.1) + '" stroke-linecap="round"/>';
}
function mascotSVG() {
  return '<svg class="mascot" viewBox="0 0 200 200" role="img" aria-label="Happy sun">' + sunFace(100, 100, 60, uid()) + '</svg>';
}
function cloud(x, y, s) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" fill="#fff" opacity=".95"><circle cx="0" cy="0" r="14"/><circle cx="16" cy="-8" r="18"/><circle cx="34" cy="0" r="14"/><rect x="-6" y="-2" width="46" height="16" rx="8"/></g>';
}
function childHead(cx, cy, r, closed) {
  const k = v => (+v).toFixed(1);
  const eyes = closed
    ? '<path d="M' + k(cx - r * 0.5) + ' ' + k(cy + r * 0.05) + ' q' + k(r * 0.2) + ' ' + k(r * 0.16) + ' ' + k(r * 0.4) + ' 0M' + k(cx + r * 0.1) + ' ' + k(cy + r * 0.05) + ' q' + k(r * 0.2) + ' ' + k(r * 0.16) + ' ' + k(r * 0.4) + ' 0" fill="none" stroke="#3A1E0E" stroke-width="' + k(r * 0.09) + '" stroke-linecap="round"/>'
    : '<circle cx="' + k(cx - r * 0.33) + '" cy="' + k(cy + r * 0.02) + '" r="' + k(r * 0.12) + '" fill="#3A1E0E"/><circle cx="' + k(cx + r * 0.33) + '" cy="' + k(cy + r * 0.02) + '" r="' + k(r * 0.12) + '" fill="#3A1E0E"/><circle cx="' + k(cx - r * 0.29) + '" cy="' + k(cy - r * 0.03) + '" r="' + k(r * 0.04) + '" fill="#fff"/><circle cx="' + k(cx + r * 0.37) + '" cy="' + k(cy - r * 0.03) + '" r="' + k(r * 0.04) + '" fill="#fff"/>';
  return '<circle cx="' + k(cx - r * 0.98) + '" cy="' + k(cy + r * 0.1) + '" r="' + k(r * 0.2) + '" fill="#B87A4B"/><circle cx="' + k(cx + r * 0.98) + '" cy="' + k(cy + r * 0.1) + '" r="' + k(r * 0.2) + '" fill="#B87A4B"/>' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#C98B5A"/>' +
    '<path d="M' + k(cx - r) + ' ' + k(cy - r * 0.05) + ' Q' + k(cx - r * 0.95) + ' ' + k(cy - r * 1.15) + ' ' + cx + ' ' + k(cy - r * 1.08) + ' Q' + k(cx + r * 0.95) + ' ' + k(cy - r * 1.15) + ' ' + k(cx + r) + ' ' + k(cy - r * 0.05) + ' Q' + k(cx + r * 0.7) + ' ' + k(cy - r * 0.62) + ' ' + k(cx + r * 0.05) + ' ' + k(cy - r * 0.6) + ' Q' + k(cx - r * 0.6) + ' ' + k(cy - r * 0.62) + ' ' + k(cx - r) + ' ' + k(cy - r * 0.05) + 'Z" fill="#2B1A10"/>' +
    eyes +
    '<circle cx="' + k(cx - r * 0.58) + '" cy="' + k(cy + r * 0.32) + '" r="' + k(r * 0.14) + '" fill="#FF6F91" opacity=".4"/><circle cx="' + k(cx + r * 0.58) + '" cy="' + k(cy + r * 0.32) + '" r="' + k(r * 0.14) + '" fill="#FF6F91" opacity=".4"/>' +
    '<path d="M' + k(cx - r * 0.28) + ' ' + k(cy + r * 0.38) + ' Q' + cx + ' ' + k(cy + r * 0.68) + ' ' + k(cx + r * 0.28) + ' ' + k(cy + r * 0.38) + '" fill="none" stroke="#3A1E0E" stroke-width="' + k(r * 0.09) + '" stroke-linecap="round"/>';
}
function diya(x, y, s, u) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
    '<circle cx="0" cy="-26" r="22" fill="url(#' + u + 'dg)" class="pulse-glow"/>' +
    '<path class="flame" d="M0 -40 C8 -28 7 -18 0 -14 C-7 -18 -8 -28 0 -40Z" fill="#FFB020"/>' +
    '<path d="M0 -32 C4 -25 3 -19 0 -17 C-3 -19 -4 -25 0 -32Z" fill="#FFF3A0"/>' +
    '<path d="M-26 -12 Q0 -8 26 -12 Q22 8 0 10 Q-22 8 -26 -12Z" fill="#D9632B"/>' +
    '<path d="M-26 -12 Q0 -16 26 -12 Q0 -6 -26 -12Z" fill="#F08A4B"/></g>';
}
const diyaDefs = u => '<radialGradient id="' + u + 'dg"><stop offset="0" stop-color="#FFF3A0" stop-opacity=".95"/><stop offset="1" stop-color="#FFC83D" stop-opacity="0"/></radialGradient>';
const PIC_LABEL = { sunrise: 'Sun rising over the earth and sky', sun: 'Surya Dev, the shining Sun god', glow: 'Child sitting quietly in a glowing light', idea: 'Happy child with a bright idea' };

/* ------------------------------------------------------------------ */
/* Surya Dev (Sun god) — deity of the Gayatri Mantra (Savitr/Surya).   */
/* Iconography: golden crown (kirita), radiant sun-disc halo, two       */
/* pink lotuses held at shoulder height, kundala earrings, red tilak,  */
/* sacred thread, saffron-red garments. Drawn friendly for small kids. */
/* ------------------------------------------------------------------ */
function lotusFlower(x, y, s) {
  let p = '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">';
  [-52, -26, 26, 52, 0].forEach(a => {
    p += '<ellipse cx="0" cy="-11" rx="5.5" ry="12" fill="' + (a === 0 ? '#FF6F91' : '#FF9BB5') + '" stroke="#D94A73" stroke-width="1.2" transform="rotate(' + a + ' 0 2)"/>';
  });
  return p + '<path d="M-10 2 Q0 8 10 2 Q0 5 -10 2Z" fill="#3DBE55"/></g>';
}
function suryaGroup(u, opts) {
  opts = opts || {};
  const skin = '#F2A65A', skinLine = '#C9772E';
  let rays = '';
  for (let i = 0; i < 16; i++) {
    const a = i * 22.5;
    rays += '<path d="M100 2 L108 20 L92 20Z" fill="' + (i % 2 ? '#FFB02E' : '#FF8A1F') + '" transform="rotate(' + a + ' 100 86)"/>';
  }
  const arm = side => {
    const m = side < 0 ? '' : ' transform="translate(200 0) scale(-1 1)"';
    return '<g' + m + '>' +
      '<path d="M70 152 Q54 162 50 178" fill="none" stroke="' + skinLine + '" stroke-width="17" stroke-linecap="round"/>' +
      '<path d="M70 152 Q54 162 50 178" fill="none" stroke="' + skin + '" stroke-width="14" stroke-linecap="round"/>' +
      '<path d="M50 178 Q40 162 44 136" fill="none" stroke="' + skinLine + '" stroke-width="15" stroke-linecap="round"/>' +
      '<path d="M50 178 Q40 162 44 136" fill="none" stroke="' + skin + '" stroke-width="12" stroke-linecap="round"/>' +
      '<path d="M56 160 l9 -5" stroke="#FFD24A" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M41 150 l9 2" stroke="#FFD24A" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M45 132 Q43 118 44 104" fill="none" stroke="#2E9E44" stroke-width="3"/>' +
      '<circle cx="44" cy="134" r="7" fill="' + skin + '" stroke="' + skinLine + '" stroke-width="1.5"/>' +
      '<g class="dp dp-lotus" data-part="lotus">' + lotusFlower(44, 104, 1.05) + '</g></g>';
  };
  return '<defs>' +
      '<radialGradient id="' + u + 'halo" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#FFFBE0"/><stop offset=".55" stop-color="#FFE27A"/><stop offset="1" stop-color="#FFB030"/></radialGradient>' +
      '<linearGradient id="' + u + 'gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE680"/><stop offset="1" stop-color="#F2A900"/></linearGradient>' +
      '<linearGradient id="' + u + 'robe" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF7A1A"/><stop offset="1" stop-color="#E0431B"/></linearGradient>' +
    '</defs>' +
    '<g class="dp dp-rays" data-part="rays"><g class="halo-rays">' + rays + '</g></g>' +
    '<circle cx="100" cy="86" r="68" fill="url(#' + u + 'halo)" stroke="#FF9F1C" stroke-width="3"/>' +
    '<circle cx="100" cy="86" r="56" fill="none" stroke="#FFF3B0" stroke-width="2" opacity=".8"/>' +
    /* torso + garments */
    '<path d="M58 200 Q56 156 76 146 L124 146 Q144 156 142 200Z" fill="' + skin + '" stroke="' + skinLine + '" stroke-width="1.5"/>' +
    '<path d="M58 200 Q56 170 66 158 Q84 180 100 181 Q116 180 134 158 Q144 170 142 200Z" fill="url(#' + u + 'robe)"/>' +
    '<path d="M60 170 Q100 196 140 170" fill="none" stroke="#FFD24A" stroke-width="3" opacity=".9"/>' +
    '<path d="M68 190 H132" stroke="#FFD24A" stroke-width="4"/>' +
    '<path d="M84 148 Q98 170 122 196" fill="none" stroke="#FFF4D6" stroke-width="2.5"/>' +
    arm(-1) + arm(1) +
    /* neck, necklace */
    '<rect x="91" y="118" width="18" height="30" rx="6" fill="' + skin + '"/>' +
    '<path d="M80 146 Q100 170 120 146" fill="none" stroke="url(#' + u + 'gold)" stroke-width="6" stroke-linecap="round"/>' +
    '<circle cx="100" cy="160" r="5" fill="#E53935" stroke="#FFD24A" stroke-width="2"/>' +
    /* head */
    '<path d="M77 90 Q67 104 72 116 Q64 124 70 134 Q74 142 81 137 Q76 129 81 123 Q76 113 84 100Z" fill="#2B1A10"/>' +
    '<path d="M123 90 Q133 104 128 116 Q136 124 130 134 Q126 142 119 137 Q124 129 119 123 Q124 113 116 100Z" fill="#2B1A10"/>' +
    '<circle cx="100" cy="100" r="27" fill="' + skin + '" stroke="' + skinLine + '" stroke-width="1.5"/>' +
    '<circle cx="73" cy="104" r="5" fill="' + skin + '" stroke="' + skinLine + '" stroke-width="1.2"/><circle cx="127" cy="104" r="5" fill="' + skin + '" stroke="' + skinLine + '" stroke-width="1.2"/>' +
    '<circle cx="72" cy="115" r="5.5" fill="none" stroke="#FFD24A" stroke-width="3"/><circle cx="128" cy="115" r="5.5" fill="none" stroke="#FFD24A" stroke-width="3"/>' +
    /* crown (kirita mukuta) */
    '<path d="M68 82 Q62 70 70 62 Q74 72 80 76Z" fill="url(#' + u + 'gold)" stroke="#D08A00" stroke-width="1.5"/>' +
    '<path d="M132 82 Q138 70 130 62 Q126 72 120 76Z" fill="url(#' + u + 'gold)" stroke="#D08A00" stroke-width="1.5"/>' +
    '<path d="M77 84 L81 56 L90 50 L93 38 L100 22 L107 38 L110 50 L119 56 L123 84Z" fill="url(#' + u + 'gold)" stroke="#D08A00" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M81 56 H119 M90 50 H110" stroke="#D08A00" stroke-width="1.6"/>' +
    '<path d="M93 38 H107" stroke="#D08A00" stroke-width="1.4"/>' +
    '<rect x="72" y="76" width="56" height="10" rx="5" fill="#FFD24A" stroke="#D08A00" stroke-width="2"/>' +
    '<circle cx="100" cy="67" r="7" fill="#E53935" stroke="#FFF3B0" stroke-width="2"/>' +
    '<circle cx="86" cy="68" r="2.5" fill="#2EC4B6"/><circle cx="114" cy="68" r="2.5" fill="#2EC4B6"/><circle cx="100" cy="44" r="2.8" fill="#E53935"/>' +
    '<circle cx="86" cy="81" r="2.6" fill="#E53935"/><circle cx="100" cy="81" r="2.6" fill="#2EC4B6"/><circle cx="114" cy="81" r="2.6" fill="#E53935"/>' +
    '<circle cx="100" cy="19" r="4" fill="#FFD24A" stroke="#D08A00" stroke-width="1.5"/>' +
    /* face */
    '<path d="M100 88 v7" stroke="#E53935" stroke-width="3.2" stroke-linecap="round"/>' +
    '<path d="M86 94 q5 -3 9 0M105 94 q5 -3 9 0" fill="none" stroke="#3A1E0E" stroke-width="2" stroke-linecap="round"/>' +
    '<g class="eyes"><ellipse cx="90.5" cy="102" rx="3.6" ry="4.6" fill="#3A1E0E"/><ellipse cx="109.5" cy="102" rx="3.6" ry="4.6" fill="#3A1E0E"/>' +
    '<circle cx="91.6" cy="100.4" r="1.3" fill="#fff"/><circle cx="110.6" cy="100.4" r="1.3" fill="#fff"/></g>' +
    '<circle class="cheek" cx="84" cy="112" r="4.5" fill="#FF6F91" opacity=".35"/><circle class="cheek" cx="116" cy="112" r="4.5" fill="#FF6F91" opacity=".35"/>' +
    '<path d="M99 106 q1 3 2 0" fill="none" stroke="' + skinLine + '" stroke-width="1.5" stroke-linecap="round"/>' +
    '<path d="M92 114 Q100 121 108 114" fill="none" stroke="#8A2E12" stroke-width="2.6" stroke-linecap="round"/>';
}
/* Full illustration (home hero) */
function suryaSVG(label) {
  return '<svg class="deity" viewBox="0 0 200 200" role="img" aria-label="' + (label || 'Surya Dev, the Sun god') + '">' + suryaGroup(uid()) + '</svg>';
}
/* Round badge for activity screen headers (head, crown and halo) */
function suryaBadge() {
  return '<svg viewBox="42 14 116 116" role="img" aria-label="Surya Dev">' + suryaGroup(uid()) + '</svg>';
}

/* ------------------------------------------------------------------ */
/* Deity illustrations (viewBox 0 0 200 200). Friendly, respectful,    */
/* with traditional iconography.                                       */
/* ------------------------------------------------------------------ */
const fx = v => (+v).toFixed(1);
const part = (name, svg) => '<g class="dp dp-' + name + '" data-part="' + name + '">' + svg + '</g>';
function limb(a, c, b, skin, line, w) {
  const d = 'M' + a[0] + ' ' + a[1] + ' Q' + c[0] + ' ' + c[1] + ' ' + b[0] + ' ' + b[1];
  return '<path d="' + d + '" fill="none" stroke="' + line + '" stroke-width="' + (w + 3) + '" stroke-linecap="round"/>' +
    '<path d="' + d + '" fill="none" stroke="' + skin + '" stroke-width="' + w + '" stroke-linecap="round"/>';
}
function handDot(x, y, r, skin, line) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + skin + '" stroke="' + line + '" stroke-width="1.5"/>'; }
/* raised open palm (abhaya mudra) */
function palmUp(x, y, skin, line, s) {
  s = s || 1;
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" fill="' + skin + '" stroke="' + line + '" stroke-width="1.4" stroke-linejoin="round">' +
    '<rect x="-7.5" y="-17" width="4" height="12" rx="2"/><rect x="-3.2" y="-19" width="4" height="14" rx="2"/><rect x="1.1" y="-18" width="4" height="13" rx="2"/><rect x="5.2" y="-15" width="3.6" height="10" rx="1.8"/>' +
    '<rect x="-12" y="-6" width="4" height="10" rx="2" transform="rotate(-35 -8 3)"/>' +
    '<path d="M-8 -7 H9 V4 Q9 11 0.5 11 Q-8 11 -8 4Z"/><path d="M-6.5 -6 H8" stroke="' + skin + '" stroke-width="3"/></g>';
}
function kidFace(cx, cy, o) {
  const skin = o.skin, line = o.line;
  let s = '<circle cx="' + cx + '" cy="' + cy + '" r="' + (o.r || 26) + '" fill="' + skin + '" stroke="' + line + '" stroke-width="1.5"/>';
  const ey = cy + 2;
  if (o.closed) {
    s += '<path d="M' + (cx - 14) + ' ' + ey + ' q4.5 4 9 0M' + (cx + 5) + ' ' + ey + ' q4.5 4 9 0" fill="none" stroke="#2A1608" stroke-width="2.4" stroke-linecap="round"/>';
  } else {
    s += '<g class="eyes"><ellipse cx="' + (cx - 9.5) + '" cy="' + ey + '" rx="3.6" ry="4.6" fill="#2A1608"/><ellipse cx="' + (cx + 9.5) + '" cy="' + ey + '" rx="3.6" ry="4.6" fill="#2A1608"/>' +
      '<circle cx="' + (cx - 8.4) + '" cy="' + (ey - 1.6) + '" r="1.3" fill="#fff"/><circle cx="' + (cx + 10.6) + '" cy="' + (ey - 1.6) + '" r="1.3" fill="#fff"/></g>';
    if (o.lashes) s += '<path d="M' + (cx - 13.5) + ' ' + (ey - 3) + ' l-2.5 -2M' + (cx + 13.5) + ' ' + (ey - 3) + ' l2.5 -2" stroke="#2A1608" stroke-width="1.6" stroke-linecap="round"/>';
  }
  if (!o.noBrows) s += '<path d="M' + (cx - 14) + ' ' + (cy - 6) + ' q5 -3 9 0M' + (cx + 5) + ' ' + (cy - 6) + ' q5 -3 9 0" fill="none" stroke="#2A1608" stroke-width="1.8" stroke-linecap="round"/>';
  if (!o.noCheeks) s += '<circle class="cheek" cx="' + (cx - 16) + '" cy="' + (cy + 12) + '" r="4.5" fill="#FF6F91" opacity=".35"/><circle class="cheek" cx="' + (cx + 16) + '" cy="' + (cy + 12) + '" r="4.5" fill="#FF6F91" opacity=".35"/>';
  if (!o.noMouth) {
    s += '<path d="M' + (cx - 1) + ' ' + (cy + 8) + ' q1 3 2 0" fill="none" stroke="' + line + '" stroke-width="1.5" stroke-linecap="round"/>';
    s += '<path d="M' + (cx - 8) + ' ' + (cy + 14) + ' Q' + cx + ' ' + (cy + 21) + ' ' + (cx + 8) + ' ' + (cy + 14) + '" fill="none" stroke="' + (o.lip || '#8A2E12') + '" stroke-width="2.6" stroke-linecap="round"/>';
  }
  return s;
}
function crown(cx, baseY, u, s) {
  s = s || 1;
  return '<g transform="translate(' + cx + ' ' + baseY + ') scale(' + s + ')">' +
    '<path d="M-32 -2 Q-38 -14 -30 -22 Q-26 -12 -20 -8Z" fill="url(#' + u + 'gold)" stroke="#D08A00" stroke-width="1.5"/>' +
    '<path d="M32 -2 Q38 -14 30 -22 Q26 -12 20 -8Z" fill="url(#' + u + 'gold)" stroke="#D08A00" stroke-width="1.5"/>' +
    '<path d="M-23 0 L-19 -28 L-10 -34 L-7 -46 L0 -62 L7 -46 L10 -34 L19 -28 L23 0Z" fill="url(#' + u + 'gold)" stroke="#D08A00" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M-19 -28 H19 M-10 -34 H10 M-7 -46 H7" stroke="#D08A00" stroke-width="1.5"/>' +
    '<rect x="-28" y="-8" width="56" height="10" rx="5" fill="#FFD24A" stroke="#D08A00" stroke-width="2"/>' +
    '<circle cx="0" cy="-17" r="6.5" fill="#E53935" stroke="#FFF3B0" stroke-width="2"/>' +
    '<circle cx="-14" cy="-3" r="2.5" fill="#E53935"/><circle cx="0" cy="-3" r="2.5" fill="#2EC4B6"/><circle cx="14" cy="-3" r="2.5" fill="#E53935"/>' +
    '<circle cx="-13" cy="-18" r="2.2" fill="#2EC4B6"/><circle cx="13" cy="-18" r="2.2" fill="#2EC4B6"/><circle cx="0" cy="-65" r="3.6" fill="#FFD24A" stroke="#D08A00" stroke-width="1.4"/></g>';
}
const goldDefs = u => '<linearGradient id="' + u + 'gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE680"/><stop offset="1" stop-color="#F2A900"/></linearGradient>';
function kundala(x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="5.5" fill="none" stroke="#FFD24A" stroke-width="3"/>'; }
function beadsOnCurve(p0, p1, p2, n, r, fill, stroke) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0.5 : i / (n - 1), a = (1 - t) * (1 - t), b = 2 * (1 - t) * t, c = t * t;
    s += '<circle cx="' + fx(a * p0[0] + b * p1[0] + c * p2[0]) + '" cy="' + fx(a * p0[1] + b * p1[1] + c * p2[1]) + '" r="' + r + '" fill="' + fill + '"' + (stroke ? ' stroke="' + stroke + '" stroke-width="1"' : '') + '/>';
  }
  return s;
}
function halo(u, c0, c1, c2, ring, r) {
  return '<radialGradient id="' + u + 'halo" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="' + c0 + '"/><stop offset=".6" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></radialGradient>';
}
function haloCircle(u, ring, cy, r) { return '<circle cx="100" cy="' + (cy || 90) + '" r="' + (r || 72) + '" fill="url(#' + u + 'halo)" stroke="' + ring + '" stroke-width="3"/>'; }
function tripundra(cx, y, eye) {
  let s = '<path d="M' + (cx - 11) + ' ' + y + ' h22M' + (cx - 12) + ' ' + (y + 3.2) + ' h24M' + (cx - 11) + ' ' + (y + 6.4) + ' h22" stroke="#FFFFFF" stroke-width="1.7" stroke-linecap="round" opacity=".95"/>';
  if (eye) s += '<path d="M' + cx + ' ' + (y - 2.5) + ' q3.4 5.7 0 11.4 q-3.4 -5.7 0 -11.4Z" fill="#FFF3E0" stroke="#E53935" stroke-width="1.5"/><ellipse cx="' + cx + '" cy="' + (y + 3.2) + '" rx="1.1" ry="2.4" fill="#E53935"/>';
  return s;
}
function tigerSkin(path) {
  return '<path d="' + path + '" fill="#F5A94A" stroke="#C77A22" stroke-width="1.5"/>';
}
function snakeNeck() {
  return '<path d="M80 126 Q100 140 120 126" fill="none" stroke="#2E8B4A" stroke-width="7" stroke-linecap="round"/>' +
    '<path d="M80 126 Q100 140 120 126" fill="none" stroke="#56C271" stroke-width="4" stroke-linecap="round"/>' +
    '<path d="M120 126 Q134 130 138 122" fill="none" stroke="#2E8B4A" stroke-width="7" stroke-linecap="round"/>' +
    '<path d="M120 126 Q134 130 138 122" fill="none" stroke="#56C271" stroke-width="4" stroke-linecap="round"/>' +
    '<g class="dp dp-snake" data-part="snake"><path d="M139 106 C149 108 149 124 139 126 C129 124 129 108 139 106Z" fill="#56C271" stroke="#2E8B4A" stroke-width="1.5"/>' +
    '<ellipse cx="139" cy="117" rx="3" ry="5" fill="#C9F2D2"/><circle cx="136.5" cy="111.5" r="1.3" fill="#1B3A1B"/><circle cx="141.5" cy="111.5" r="1.3" fill="#1B3A1B"/>' +
    '<path d="M139 126 v3 l-1.5 2M139 129 l1.5 2" stroke="#E53935" stroke-width="1" fill="none"/></g>';
}
function shivaHead(u, eyesClosed) {
  const skin = '#86C9F2', line = '#3C86C4';
  return '<path d="M76 90 Q66 108 70 120 Q63 128 69 138 Q73 146 81 141 Q76 132 81 125 Q76 114 84 100Z" fill="#4A2A17"/>' +
    '<path d="M124 90 Q134 108 130 120 Q137 128 131 138 Q127 146 119 141 Q124 132 119 125 Q124 114 116 100Z" fill="#4A2A17"/>' +
    '<rect x="91" y="112" width="18" height="18" rx="6" fill="' + skin + '"/>' +
    kidFace(100, 96, { skin, line, closed: eyesClosed, lip: '#2F5E8C' }) +
    '<circle cx="73" cy="100" r="5" fill="' + skin + '" stroke="' + line + '" stroke-width="1.2"/><circle cx="127" cy="100" r="5" fill="' + skin + '" stroke="' + line + '" stroke-width="1.2"/>' +
    '<circle cx="72" cy="111" r="4.6" fill="#8B4A22" stroke="#5C2E12" stroke-width="1.2"/><circle cx="128" cy="111" r="4.6" fill="#8B4A22" stroke="#5C2E12" stroke-width="1.2"/>' +
    /* jata: matted hair and top-knot */
    '<path d="M74 94 Q72 70 100 68 Q128 70 126 94 Q114 80 100 80 Q86 80 74 94Z" fill="#4A2A17"/>' +
    '<ellipse cx="100" cy="60" rx="17" ry="15" fill="#4A2A17"/>' +
    '<path d="M86 56 Q100 50 114 56M85 64 Q100 58 115 64" fill="none" stroke="#7A4A2A" stroke-width="2.5" stroke-linecap="round"/>' +
    '<ellipse cx="100" cy="45" rx="9" ry="8" fill="#4A2A17"/>' +
    '<circle cx="100" cy="72" r="3" fill="#8B4A22"/><circle cx="92" cy="73" r="2.4" fill="#8B4A22"/><circle cx="108" cy="73" r="2.4" fill="#8B4A22"/>' +
    /* crescent moon */
    '<g class="dp dp-moon" data-part="moon">' +
    '<path d="M76 44 A12 12 0 1 0 90 66 A9.5 9.5 0 1 1 76 44Z" fill="#FFF7CC" stroke="#E6C24A" stroke-width="1.5"/>' +
    '</g>' +
    /* Ganga flowing from the hair */
    '<g class="dp dp-ganga" data-part="ganga">' +
    '<path d="M104 40 Q108 22 122 18 Q134 16 136 28" fill="none" stroke="#3FA7F5" stroke-width="5" stroke-linecap="round"/>' +
    '<path d="M105 38 Q109 24 121 21 Q131 19 133 27" fill="none" stroke="#CFEFFF" stroke-width="1.8" stroke-linecap="round"/>' +
    '<circle cx="137" cy="35" r="2.2" fill="#3FA7F5"/><circle cx="134" cy="41" r="1.8" fill="#3FA7F5"/><circle cx="139" cy="44" r="1.5" fill="#3FA7F5"/>' +
    '</g>' +
    tripundra(100, 84, true);
}
function trishul(x, top, bottom, damaru) {
  let s = '<path d="M' + x + ' ' + (top + 14) + ' V' + bottom + '" stroke="#8A5A2B" stroke-width="4.5" stroke-linecap="round"/>' +
    '<path d="M' + (x - 13) + ' ' + (top + 2) + ' Q' + (x - 14) + ' ' + (top + 18) + ' ' + x + ' ' + (top + 20) + ' Q' + (x + 14) + ' ' + (top + 18) + ' ' + (x + 13) + ' ' + (top + 2) + '" fill="none" stroke="#9AA8B6" stroke-width="4.5" stroke-linecap="round"/>' +
    '<path d="M' + (x - 13) + ' ' + (top - 5) + ' l4 8 h-8z M' + (x + 13) + ' ' + (top - 5) + ' l4 8 h-8z" fill="#C9D3DD" stroke="#8595A5" stroke-width="1.2"/>' +
    '<path d="M' + x + ' ' + (top - 12) + ' l5 12 l-5 8 l-5 -8z" fill="#C9D3DD" stroke="#8595A5" stroke-width="1.2"/>' +
    '<path d="M' + x + ' ' + (top + 4) + ' V' + (top + 20) + '" stroke="#9AA8B6" stroke-width="4.5"/>' +
    '<path d="M' + (x - 4) + ' ' + (top + 24) + ' h8" stroke="#FFD24A" stroke-width="3" stroke-linecap="round"/>';
  s = part('trishul', s);
  if (damaru) {
    const y = top + 36;
    s += part('damaru', '<path d="M' + (x - 11) + ' ' + (y - 9) + ' L' + (x + 11) + ' ' + (y - 9) + ' L' + (x + 2) + ' ' + y + ' L' + (x + 11) + ' ' + (y + 9) + ' L' + (x - 11) + ' ' + (y + 9) + ' L' + (x - 2) + ' ' + y + 'Z" fill="#D9A066" stroke="#8A5A2B" stroke-width="1.5" stroke-linejoin="round"/>' +
      '<path d="M' + (x - 11) + ' ' + (y - 9) + ' h22M' + (x - 11) + ' ' + (y + 9) + ' h22" stroke="#E53935" stroke-width="3"/>' +
      '<path d="M' + (x - 2) + ' ' + y + ' q-10 2 -14 10M' + (x + 2) + ' ' + y + ' q10 2 14 10" fill="none" stroke="#8A5A2B" stroke-width="1.2"/>' +
      '<circle cx="' + (x - 16) + '" cy="' + (y + 11) + '" r="2.6" fill="#8A5A2B"/><circle cx="' + (x + 16) + '" cy="' + (y + 11) + '" r="2.6" fill="#8A5A2B"/>');
  }
  return s;
}

/* 1. Meditating Shiva (Om Namah Shivaya) */
function drawShiva(u) {
  const skin = '#86C9F2', line = '#3C86C4';
  return '<defs>' + goldDefs(u) + halo(u, '#FFFFFF', '#DDF0FF', '#A7D3F5') + '</defs>' +
    haloCircle(u, '#8CC4EE', 92, 74) +
    trishul(170, 34, 196, false) +
    tigerSkin('M40 186 Q42 164 70 164 L130 164 Q158 164 160 186 Q160 198 100 198 Q40 198 40 186Z') +
    '<path d="M58 176 q6 -4 10 2M84 182 q5 -5 10 1M112 180 q5 -5 10 1M136 176 q6 -4 10 2M70 190 q5 -4 9 1M120 191 q5 -4 9 1" fill="none" stroke="#6B3A12" stroke-width="2.4" stroke-linecap="round"/>' +
    '<path d="M72 128 Q64 150 72 170 L128 170 Q136 150 128 128 Q114 122 100 122 Q86 122 72 128Z" fill="' + skin + '" stroke="' + line + '" stroke-width="1.5"/>' +
    '<path d="M44 180 Q42 164 68 162 H132 Q158 164 156 180 Q154 192 130 190 Q100 184 70 190 Q46 192 44 180Z" fill="' + skin + '" stroke="' + line + '" stroke-width="1.5"/>' +
    '<path d="M70 168 Q100 164 130 168 L126 182 Q100 176 74 182Z" fill="#F5A94A" stroke="#C77A22" stroke-width="1.3"/><path d="M86 172 q4 -3 8 1M106 172 q4 -3 8 1" fill="none" stroke="#6B3A12" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M84 188 Q100 180 116 188" fill="none" stroke="' + line + '" stroke-width="1.5"/><ellipse cx="92" cy="186" rx="7" ry="4" fill="#B9E0F7" stroke="' + line + '" stroke-width="1.2"/><ellipse cx="108" cy="186" rx="7" ry="4" fill="#B9E0F7" stroke="' + line + '" stroke-width="1.2"/>' +
    limb([74, 132], [52, 150], [52, 172], skin, line, 12) + limb([126, 132], [148, 150], [148, 172], skin, line, 12) +
    handDot(52, 172, 7, skin, line) + handDot(148, 172, 7, skin, line) +
    '<circle cx="52" cy="167" r="3" fill="none" stroke="' + line + '" stroke-width="1.4"/><circle cx="148" cy="167" r="3" fill="none" stroke="' + line + '" stroke-width="1.4"/>' +
    beadsOnCurve([61, 141], [63, 138], [66, 136], 3, 2.6, '#8B4A22') + beadsOnCurve([139, 141], [137, 138], [134, 136], 3, 2.6, '#8B4A22') +
    beadsOnCurve([82, 126], [100, 168], [118, 126], 13, 2.9, '#8B4A22', '#5C2E12') +
    snakeNeck() +
    shivaHead(u, true);
}
/* 6. Shiva with trident and damaru, blessing (Mahamrityunjaya) */
function drawRudra(u) {
  const skin = '#86C9F2', line = '#3C86C4';
  let rays = '';
  for (let i = 0; i < 12; i++) rays += '<path d="M100 8 L105 22 L95 22Z" fill="#FFE08A" transform="rotate(' + (i * 30) + ' 100 90)"/>';
  return '<defs>' + goldDefs(u) + halo(u, '#FFFBEA', '#FFE3A3', '#FFB65C') + '</defs>' +
    part('rays', '<g class="halo-rays">' + rays + '</g>') + haloCircle(u, '#F59E2E', 90, 70) +
    trishul(38, 24, 200, true) +
    '<path d="M60 200 Q58 156 78 146 L122 146 Q142 156 140 200Z" fill="' + skin + '" stroke="' + line + '" stroke-width="1.5"/>' +
    tigerSkin('M60 200 Q60 174 72 162 Q86 182 100 184 Q114 182 128 162 Q140 174 140 200Z') +
    '<path d="M72 186 q5 -4 9 1M96 192 q5 -4 9 1M120 186 q5 -4 9 1" fill="none" stroke="#6B3A12" stroke-width="2.4" stroke-linecap="round"/>' +
    '<path d="M80 148 Q100 174 128 196" fill="none" stroke="#F5A94A" stroke-width="9"/><path d="M92 160 l4 -2M108 176 l4 -3" stroke="#6B3A12" stroke-width="2" stroke-linecap="round"/>' +
    limb([74, 150], [48, 164], [40, 134], skin, line, 12) + handDot(40, 132, 8, skin, line) +
    limb([126, 150], [152, 160], [154, 126], skin, line, 12) + part('hand', palmUp(154, 124, skin, line, 1.1)) +
    beadsOnCurve([58, 152], [61, 149], [64, 147], 3, 2.6, '#8B4A22') + beadsOnCurve([142, 152], [139, 149], [136, 147], 3, 2.6, '#8B4A22') +
    beadsOnCurve([82, 128], [100, 172], [118, 128], 13, 2.9, '#8B4A22', '#5C2E12') +
    snakeNeck() + shivaHead(u, false);
}
/* 3. Ganesha: elephant head, one tusk, curved trunk, modak, mouse */
function modak(x, y, s) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + (s || 1) + ')"><path d="M0 -12 C4 -6 10 -2 10 4 C10 10 5 12 0 12 C-5 12 -10 10 -10 4 C-10 -2 -4 -6 0 -12Z" fill="#FFD27A" stroke="#D9912A" stroke-width="1.5"/>' +
    '<path d="M0 -10 V11 M-5 -4 Q-7 4 -5 11 M5 -4 Q7 4 5 11" fill="none" stroke="#E0A040" stroke-width="1.3"/></g>';
}
function mouse(x, y, s) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + (s || 1) + ')">' +
    '<path d="M-14 4 Q-30 6 -30 -6 Q-30 -14 -22 -12" fill="none" stroke="#8A96A3" stroke-width="2.5" stroke-linecap="round"/>' +
    '<ellipse cx="0" cy="0" rx="16" ry="11" fill="#A9B4C0" stroke="#7B8794" stroke-width="1.5"/>' +
    '<circle cx="14" cy="-5" r="8" fill="#A9B4C0" stroke="#7B8794" stroke-width="1.5"/>' +
    '<circle cx="10" cy="-13" r="4.5" fill="#FFB3C7" stroke="#7B8794" stroke-width="1.2"/><circle cx="18" cy="-13" r="4" fill="#FFB3C7" stroke="#7B8794" stroke-width="1.2"/>' +
    '<circle cx="16" cy="-6" r="1.6" fill="#1E2A36"/><circle cx="22" cy="-3" r="2" fill="#FF6F91"/>' +
    '<path d="M-6 10 v3M6 10 v3" stroke="#7B8794" stroke-width="2.4" stroke-linecap="round"/></g>';
}
function drawGanesha(u) {
  const skin = '#F9B79E', line = '#C77460', inner = '#FBD3C4';
  return '<defs>' + goldDefs(u) + halo(u, '#FFF8E1', '#FFDC8A', '#FFAF5A') + '</defs>' +
    haloCircle(u, '#FF9F4A', 88, 72) +
    /* body with big round belly */
    '<path d="M70 200 Q56 170 66 150 Q76 136 100 136 Q124 136 134 150 Q144 170 130 200Z" fill="' + skin + '" stroke="' + line + '" stroke-width="1.5"/>' +
    '<ellipse cx="100" cy="172" rx="30" ry="24" fill="' + inner + '" opacity=".6"/><circle cx="100" cy="176" r="2.2" fill="' + line + '"/>' +
    '<path d="M64 188 Q100 200 136 188 L138 200 H62Z" fill="#FFD54A" stroke="#E0A800" stroke-width="1.5"/><path d="M63 192 Q100 203 137 192" fill="none" stroke="#E53935" stroke-width="3"/>' +
    '<path d="M72 144 Q100 170 128 144" fill="none" stroke="#E53935" stroke-width="7" stroke-linecap="round"/>' +
    '<path d="M80 142 Q100 160 120 142" fill="none" stroke="url(#' + u + 'gold)" stroke-width="4" stroke-linecap="round"/><circle cx="100" cy="152" r="4" fill="#2EC4B6" stroke="#FFD24A" stroke-width="1.5"/>' +
    /* arms: blessing hand and hand with modak */
    limb([72, 146], [50, 166], [48, 136], skin, line, 13) + palmUp(48, 132, skin, line, 1.15) +
    limb([128, 146], [152, 166], [150, 148], skin, line, 13) + handDot(150, 148, 8, skin, line) + part('modak', modak(150, 134, 1.05)) +
    '<path d="M44 150 l9 1M147 162 l9 -2" stroke="#FFD24A" stroke-width="4" stroke-linecap="round"/>' +
    /* big ears */
    '<g class="dp dp-ears" data-part="ears">' +
    '<path d="M76 78 C50 62 34 84 40 106 C44 122 60 128 76 116Z" fill="' + skin + '" stroke="' + line + '" stroke-width="1.5"/>' +
    '<path d="M72 84 C54 74 44 90 48 104 C51 114 62 118 72 110Z" fill="' + inner + '"/>' +
    '<path d="M124 78 C150 62 166 84 160 106 C156 122 140 128 124 116Z" fill="' + skin + '" stroke="' + line + '" stroke-width="1.5"/>' +
    '<path d="M128 84 C146 74 156 90 152 104 C149 114 138 118 128 110Z" fill="' + inner + '"/>' +
    '</g>' +
    /* head */
    '<ellipse cx="100" cy="92" rx="28" ry="27" fill="' + skin + '" stroke="' + line + '" stroke-width="1.5"/>' +
    /* tusk (one whole, one broken) */
    '<path d="M88 110 Q80 118 78 128 Q86 124 92 114Z" fill="#FFFDF4" stroke="#C9B89A" stroke-width="1.2"/>' +
    '<path d="M112 110 L117 115 L114 118 L110 113Z" fill="#FFFDF4" stroke="#C9B89A" stroke-width="1.2"/>' +
    /* curved trunk (vakratunda) */
    '<g class="dp dp-trunk" data-part="trunk">' +
    '<path d="M100 98 Q97 124 104 138 Q111 150 124 146 Q133 142 130 133" fill="none" stroke="' + line + '" stroke-width="17" stroke-linecap="round"/>' +
    '<path d="M100 98 Q97 124 104 138 Q111 150 124 146 Q133 142 130 133" fill="none" stroke="' + skin + '" stroke-width="14" stroke-linecap="round"/>' +
    '<path d="M94 112 h10M94 119 h10M96 126 h10M100 133 h9" stroke="' + line + '" stroke-width="1.2" stroke-linecap="round" opacity=".7"/>' +
    '</g>' +
    kidFace(100, 88, { skin, line, r: 0.01, noMouth: true, noCheeks: true }).replace(/<circle cx="100" cy="88" r="0.01"[^>]*\/>/, '') +
    '<circle class="cheek" cx="80" cy="100" r="4.5" fill="#FF6F91" opacity=".35"/><circle class="cheek" cx="120" cy="100" r="4.5" fill="#FF6F91" opacity=".35"/>' +
    '<path d="M95 80 Q100 70 105 80" fill="none" stroke="#E53935" stroke-width="2.5" stroke-linecap="round"/><circle cx="100" cy="80" r="2" fill="#E53935"/>' +
    crown(100, 70, u, 0.9) +
    part('mouse', mouse(34, 184, 0.95)) + part('modak', modak(62, 190, 0.7));
}
/* 4. Lakshmi: red sari, lotuses, gold coins, lotus seat */
function coin(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#FFD24A" stroke="#D08A00" stroke-width="1.3"/><circle cx="' + x + '" cy="' + y + '" r="' + (r * 0.55) + '" fill="none" stroke="#E0A800" stroke-width="1"/>'; }
function lotusSeat(cy) {
  let s = '';
  [-70, -48, -26, 26, 48, 70].forEach((dx, i) => { s += '<ellipse cx="' + (100 + dx) + '" cy="' + cy + '" rx="15" ry="9" fill="' + (i % 2 ? '#FF8FAB' : '#FFB3C7') + '" stroke="#D94A73" stroke-width="1.3" transform="rotate(' + (dx * 0.3) + ' ' + (100 + dx) + ' ' + cy + ')"/>'; });
  return s + '<ellipse cx="100" cy="' + (cy + 1) + '" rx="22" ry="10" fill="#FF6F91" stroke="#D94A73" stroke-width="1.3"/>';
}
function femaleHead(u, skin, line, extra) {
  return '<path d="M74 92 Q64 120 66 150 Q70 158 80 152 Q78 124 84 100Z" fill="#241208"/>' +
    '<path d="M126 92 Q136 120 134 150 Q130 158 120 152 Q122 124 116 100Z" fill="#241208"/>' +
    '<rect x="91" y="112" width="18" height="20" rx="6" fill="' + skin + '"/>' +
    kidFace(100, 98, { skin, line, lashes: true, lip: '#D02750' }) +
    '<path d="M74 96 Q74 74 100 72 Q126 74 126 96 Q118 84 100 84 Q82 84 74 96Z" fill="#241208"/>' +
    '<circle cx="73" cy="102" r="5" fill="' + skin + '" stroke="' + line + '" stroke-width="1.2"/><circle cx="127" cy="102" r="5" fill="' + skin + '" stroke="' + line + '" stroke-width="1.2"/>' +
    kundala(72, 113) + kundala(128, 113) +
    '<circle cx="100" cy="89" r="2.6" fill="#E53935"/>' + (extra || '') +
    crown(100, 80, u, 0.82);
}
function drawLakshmi(u) {
  const skin = '#F0B58A', line = '#B8733F';
  let coins = '';
  [[58, 166, 5], [52, 178, 4.6], [60, 188, 5], [48, 194, 4.4], [66, 197, 4]].forEach(c => { coins += coin(c[0], c[1], c[2]); });
  return '<defs>' + goldDefs(u) + halo(u, '#FFF7FA', '#FFD6E2', '#FFA3BE') + '</defs>' +
    haloCircle(u, '#FF8FAB', 90, 72) +
    lotusSeat(190) +
    /* red sari */
    '<path d="M62 196 Q58 158 78 144 L122 144 Q142 158 138 196Z" fill="#E53935" stroke="#B71C1C" stroke-width="1.5"/>' +
    '<path d="M122 144 Q108 170 86 196" fill="none" stroke="#FFD24A" stroke-width="5"/><path d="M62 190 H138" stroke="#FFD24A" stroke-width="4"/>' +
    '<path d="M84 144 Q100 158 116 144" fill="none" stroke="url(#' + u + 'gold)" stroke-width="5" stroke-linecap="round"/><circle cx="100" cy="153" r="4" fill="#E53935" stroke="#FFD24A" stroke-width="2"/>' +
    /* upper arms holding lotuses */
    limb([76, 148], [52, 150], [44, 118], skin, line, 11) + '<path d="M45 116 V100" stroke="#2E9E44" stroke-width="3"/>' + handDot(44, 118, 6.5, skin, line) + part('lotus', lotusFlower(45, 98, 1.05)) +
    limb([124, 148], [148, 150], [156, 118], skin, line, 11) + '<path d="M155 116 V100" stroke="#2E9E44" stroke-width="3"/>' + handDot(156, 118, 6.5, skin, line) + part('lotus', lotusFlower(155, 98, 1.05)) +
    /* lower arms: showering gold coins, holding a gold pot */
    limb([80, 152], [70, 166], [64, 156], skin, line, 11) + palmUp(62, 158, skin, line, 1).replace('translate(62 158) scale(1)', 'translate(62 160) scale(1) rotate(180)') + part('coins', coins) +
    limb([120, 152], [132, 170], [138, 164], skin, line, 11) +
    '<g class="dp dp-coins" data-part="coins">' +
    '<path d="M128 160 Q126 176 138 180 Q150 176 148 160Z" fill="url(#' + u + 'gold)" stroke="#D08A00" stroke-width="1.5"/><rect x="129" y="155" width="18" height="5" rx="2.5" fill="#FFD24A" stroke="#D08A00" stroke-width="1.2"/>' +
    coin(134, 152, 4) + coin(142, 150, 4) + handDot(138, 166, 5.5, skin, line) +
    '</g>' +
    '<path d="M44 128 l7 0M149 128 l7 0M62 166 l7 -2M128 170 l7 2" stroke="#FFD24A" stroke-width="3.5" stroke-linecap="round"/>' +
    femaleHead(u, skin, line, '<circle cx="106" cy="107" r="1.8" fill="none" stroke="#FFD24A" stroke-width="1.2"/>');
}
/* 5. Saraswati: white sari, veena, book, mala, white swan */
function swan(x, y, s) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + (s || 1) + ')">' +
    '<path d="M-22 4 Q-26 -10 -8 -8 Q4 -8 10 -2 Q14 -16 12 -26 Q10 -36 18 -38 Q26 -38 26 -30 L32 -28 L25 -26 Q20 -26 20 -18 Q22 -4 16 6 Q6 16 -10 14 Q-22 12 -22 4Z" fill="#FFFFFF" stroke="#9FB3C8" stroke-width="1.6" stroke-linejoin="round"/>' +
    '<path d="M-14 0 Q-4 -6 6 2M-12 6 Q-2 2 8 8" fill="none" stroke="#C9D6E3" stroke-width="1.6"/>' +
    '<path d="M26 -30 L33 -28 L26 -25Z" fill="#FF9F1C"/><circle cx="21" cy="-32" r="1.5" fill="#1E2A36"/></g>';
}
function drawSaraswati(u) {
  const skin = '#F6CBA4', line = '#C58F62';
  return '<defs>' + goldDefs(u) + halo(u, '#FFFFFF', '#E6F5FF', '#B6DCF7') + '</defs>' +
    haloCircle(u, '#8CC4EE', 90, 72) +
    '<ellipse cx="100" cy="194" rx="70" ry="9" fill="#DDEFFB"/>' +
    /* white sari with gold border */
    '<path d="M62 198 Q58 158 78 144 L122 144 Q142 158 138 198Z" fill="#FFFFFF" stroke="#AFC3D6" stroke-width="1.5"/>' +
    '<path d="M122 144 Q108 170 86 198" fill="none" stroke="#F2B233" stroke-width="5"/><path d="M62 192 H138" stroke="#F2B233" stroke-width="4"/>' +
    '<path d="M84 144 Q100 158 116 144" fill="none" stroke="url(#' + u + 'gold)" stroke-width="4" stroke-linecap="round"/>' +
    /* upper arms: book and mala */
    limb([76, 148], [52, 146], [44, 116], skin, line, 11) + handDot(44, 116, 6.5, skin, line) +
    '<g class="dp dp-book" data-part="book">' +
    '<g transform="rotate(-12 42 104)"><rect x="26" y="96" width="34" height="14" rx="3" fill="#E9B872" stroke="#A8702F" stroke-width="1.5"/><path d="M29 101 h28M29 105 h28" stroke="#A8702F" stroke-width="1"/><path d="M43 94 v18" stroke="#E53935" stroke-width="2.5"/></g>' +
    '</g>' +
    limb([124, 148], [148, 146], [158, 118], skin, line, 11) + handDot(158, 118, 6.5, skin, line) +
    part('mala', beadsOnCurve([154, 120], [158, 150], [164, 120], 9, 2.4, '#FFFFFF', '#9FB3C8')) +
    /* veena across the body */
    '<g class="dp dp-veena" data-part="veena">' +
    '<path d="M60 170 L150 98" stroke="#8B3F1F" stroke-width="10" stroke-linecap="round"/>' +
    '<path d="M60 170 L150 98" stroke="#B5582C" stroke-width="7" stroke-linecap="round"/>' +
    '<path class="strings" d="M64 166 L150 97M66 169 L152 100" stroke="#FFE7A8" stroke-width=".8"/>' +
    [0.25, 0.4, 0.55, 0.7, 0.85].map(t => { const x = 60 + 90 * t, y = 170 - 72 * t; return '<path d="M' + fx(x - 3) + ' ' + fx(y - 4) + ' l6 7" stroke="#FFD24A" stroke-width="1.6"/>'; }).join('') +
    '<circle cx="54" cy="176" r="19" fill="#C9772E" stroke="#8B3F1F" stroke-width="2"/><circle cx="54" cy="176" r="12" fill="none" stroke="#FFD24A" stroke-width="2"/>' +
    '<circle cx="152" cy="92" r="10" fill="#C9772E" stroke="#8B3F1F" stroke-width="2"/><path d="M146 88 l-5 -5M156 86 l3 -6" stroke="#8B3F1F" stroke-width="2.4" stroke-linecap="round"/>' +
    '</g>' +
    /* lower arms playing the veena */
    limb([80, 152], [70, 170], [84, 158], skin, line, 11) + handDot(84, 156, 6.5, skin, line) +
    limb([120, 152], [140, 146], [134, 112], skin, line, 11) + handDot(134, 112, 6.5, skin, line) +
    '<path d="M44 126 l7 0M151 128 l7 0" stroke="#FFD24A" stroke-width="3.5" stroke-linecap="round"/>' +
    femaleHead(u, skin, line, '<circle cx="82" cy="78" r="3" fill="#FFFFFF" stroke="#C9D6E3"/><circle cx="118" cy="78" r="3" fill="#FFFFFF" stroke="#C9D6E3"/>') +
    part('swan', swan(166, 184, 0.95));
}
/* 7. Hanuman: orange, golden mace (gada), carrying the mountain, flying */
function drawHanuman(u) {
  const skin = '#F2762E', line = '#B8481C', muzzle = '#FBD2AA';
  return '<defs>' + goldDefs(u) + halo(u, '#FFFFFF', '#DDF2FF', '#A2D4F6') +
    '<radialGradient id="' + u + 'gada" cx="35%" cy="30%"><stop offset="0" stop-color="#FFF3B0"/><stop offset="1" stop-color="#E0A000"/></radialGradient></defs>' +
    haloCircle(u, '#7FBEEA', 90, 72) +
    /* tail */
    '<g class="dp dp-tail" data-part="tail">' +
    '<path d="M126 184 Q176 188 180 150 Q182 128 168 126 Q158 126 162 116" fill="none" stroke="' + line + '" stroke-width="10" stroke-linecap="round"/>' +
    '<path d="M126 184 Q176 188 180 150 Q182 128 168 126 Q158 126 162 116" fill="none" stroke="' + skin + '" stroke-width="7" stroke-linecap="round"/>' +
    '</g>' +
    /* yellow scarf fluttering (flying) */
    '<path d="M122 150 Q150 160 166 176 Q150 176 140 170 Q146 184 136 190 Q128 170 120 160Z" fill="#FFC83D" stroke="#E0A000" stroke-width="1.3"/>' +
    /* body */
    '<path d="M60 200 Q56 156 78 144 L122 144 Q144 156 140 200Z" fill="' + skin + '" stroke="' + line + '" stroke-width="1.5"/>' +
    '<path d="M82 158 Q92 166 100 160 Q108 166 118 158" fill="none" stroke="' + line + '" stroke-width="1.6" opacity=".6"/>' +
    '<path d="M60 184 Q100 196 140 184 L141 200 H59Z" fill="#D62D20" stroke="#A31F16" stroke-width="1.5"/><path d="M60 182 Q100 194 140 182" fill="none" stroke="#FFC83D" stroke-width="5"/>' +
    '<path d="M84 144 Q100 158 116 144" fill="none" stroke="url(#' + u + 'gold)" stroke-width="5" stroke-linecap="round"/><circle cx="100" cy="153" r="3.6" fill="#E53935" stroke="#FFD24A" stroke-width="1.6"/>' +
    '<path d="M84 146 Q102 170 126 196" fill="none" stroke="#FFF4D6" stroke-width="2.4"/>' +
    /* gada (mace) on the shoulder */
    '<g class="dp dp-gada" data-part="gada">' +
    '<path d="M60 166 L36 104" stroke="#B8860B" stroke-width="6" stroke-linecap="round"/><path d="M60 166 L36 104" stroke="#FFD24A" stroke-width="3" stroke-linecap="round"/>' +
    '<circle cx="32" cy="92" r="17" fill="url(#' + u + 'gada)" stroke="#B8860B" stroke-width="2"/>' +
    '<path d="M16 90 Q32 98 48 90M18 98 Q32 106 46 98" fill="none" stroke="#B8860B" stroke-width="1.6"/><circle cx="32" cy="73" r="4" fill="#FFD24A" stroke="#B8860B" stroke-width="1.5"/>' +
    '</g>' +
    limb([74, 150], [48, 170], [54, 150], skin, line, 13) + handDot(54, 148, 8, skin, line) +
    /* mountain lifted high */
    limb([126, 150], [156, 140], [158, 112], skin, line, 13) + palmUp(158, 110, skin, line, 1.2) +
    '<g class="dp dp-mountain" data-part="mountain">' +
    '<g transform="translate(158 84) scale(1.35) translate(-160 -76)">' +
    '<path d="M136 86 L150 54 L158 64 L168 46 L184 86Z" fill="#8D6E4A" stroke="#5E4630" stroke-width="1.4" stroke-linejoin="round"/>' +
    '<path d="M163 55 L168 46 L173 57 Q168 60 163 55Z" fill="#FFFFFF" opacity=".8"/>' +
    '<path d="M140 78 Q146 64 156 68 Q162 58 170 62 Q178 64 180 78 Q160 84 140 78Z" fill="#5CB85C"/>' +
    '<path d="M148 72 l-2 -5M156 70 l0 -6M166 70 l2 -6M173 73 l3 -5" stroke="#2E8B3E" stroke-width="1.5" stroke-linecap="round"/>' +
    '<circle cx="150" cy="76" r="2.2" fill="#C6FF7A"/><circle cx="160" cy="73" r="2.2" fill="#FFF59D"/><circle cx="168" cy="77" r="2.2" fill="#C6FF7A"/><circle cx="175" cy="75" r="1.8" fill="#FFF59D"/><circle cx="158" cy="80" r="1.6" fill="#C6FF7A"/>' +
    '</g>' +
    '</g>' +
    '<path d="M44 158 l9 -1M150 128 l9 2" stroke="#FFD24A" stroke-width="4" stroke-linecap="round"/>' +
    /* head: monkey face with muzzle */
    '<rect x="91" y="112" width="18" height="20" rx="6" fill="' + skin + '"/>' +
    '<circle cx="73" cy="100" r="7" fill="' + muzzle + '" stroke="' + line + '" stroke-width="1.4"/><circle cx="127" cy="100" r="7" fill="' + muzzle + '" stroke="' + line + '" stroke-width="1.4"/>' +
    kundala(73, 113) + kundala(127, 113) +
    '<circle cx="100" cy="96" r="27" fill="' + skin + '" stroke="' + line + '" stroke-width="1.5"/>' +
    '<path d="M80 96 Q80 84 91 86 Q100 90 109 86 Q120 84 120 96 Q120 106 116 110 Q122 124 100 126 Q78 124 84 110 Q80 106 80 96Z" fill="' + muzzle + '"/>' +
    '<g class="eyes"><ellipse cx="91" cy="95" rx="3.4" ry="4.2" fill="#2A1608"/><ellipse cx="109" cy="95" rx="3.4" ry="4.2" fill="#2A1608"/><circle cx="92" cy="93.6" r="1.2" fill="#fff"/><circle cx="110" cy="93.6" r="1.2" fill="#fff"/></g>' +
    '<path d="M85 86 q5 -4 10 -1M105 85 q5 -3 10 1" fill="none" stroke="#6B2A0C" stroke-width="2" stroke-linecap="round"/>' +
    '<ellipse cx="100" cy="106" rx="4" ry="2.6" fill="#6B2A0C"/>' +
    '<path d="M90 114 Q100 123 110 114" fill="none" stroke="#8A2E12" stroke-width="2.6" stroke-linecap="round"/>' +
    '<path d="M97 76 V86 M103 76 V86" stroke="#FFFFFF" stroke-width="1.4"/><path d="M100 76 V87" stroke="#E53935" stroke-width="3" stroke-linecap="round"/>' +
    crown(100, 76, u, 0.85) +
    cloud(40, 190, 0.9) + cloud(118, 194, 0.8);
}

const DEITIES = {
  surya: { draw: u => suryaGroup(u), badge: '42 14 116 116', name: 'Surya Dev' },
  shiva: { draw: drawShiva, badge: '50 22 100 100', name: 'Lord Shiva meditating' },
  rudra: { draw: drawRudra, badge: '50 22 100 100', name: 'Lord Shiva with trident and damaru' },
  ganesha: { draw: drawGanesha, badge: '38 16 124 124', name: 'Lord Ganesha' },
  lakshmi: { draw: drawLakshmi, badge: '50 20 100 100', name: 'Goddess Lakshmi' },
  saraswati: { draw: drawSaraswati, badge: '50 20 100 100', name: 'Goddess Saraswati' },
  hanuman: { draw: drawHanuman, badge: '50 30 100 100', name: 'Lord Hanuman' }
};
function deitySVG(key, cls) { const d = DEITIES[key]; return '<svg class="' + (cls || 'deity') + '" viewBox="0 0 200 200" role="img" aria-label="' + esc(d.name) + '">' + d.draw(uid()) + '</svg>'; }
function deityBadge(key) { const d = DEITIES[key]; return '<svg viewBox="' + d.badge + '" role="img" aria-label="' + esc(d.name) + '">' + d.draw(uid()) + '</svg>'; }

/* ------------------------------------------------------------------ */
/* Offering flowers (viewBox 0 0 60 60) and the basket                 */
/* ------------------------------------------------------------------ */
function petalRing(n, r, rx, ry, fill, stroke, rot) {
  let s = '';
  for (let i = 0; i < n; i++) s += '<ellipse cx="30" cy="' + (30 - r) + '" rx="' + rx + '" ry="' + ry + '" fill="' + fill + '"' + (stroke ? ' stroke="' + stroke + '" stroke-width="1.2"' : '') + ' transform="rotate(' + fx(i * 360 / n + (rot || 0)) + ' 30 30)"/>';
  return s;
}
const FLOWER_ART = {
  marigold: () => petalRing(14, 15, 6, 9, '#FF9F1C', '#E07B00') + petalRing(12, 9, 5.5, 8, '#FFB547', '#E8890C', 15) + petalRing(9, 4, 4.5, 6, '#FFC83D', null, 5) + '<circle cx="30" cy="30" r="4" fill="#E8890C"/>',
  yellowm: () => petalRing(14, 15, 6, 9, '#FFD54A', '#E0A800') + petalRing(12, 9, 5.5, 8, '#FFE066', '#E8B800', 15) + '<circle cx="30" cy="30" r="5" fill="#F2B233"/>',
  hibiscus: () => petalRing(5, 12, 11, 14, '#E53935', '#B71C1C') + '<circle cx="30" cy="30" r="5" fill="#B71C1C"/><path d="M30 30 L44 14" stroke="#FFD24A" stroke-width="2.4" stroke-linecap="round"/><circle cx="44" cy="14" r="3" fill="#FFD24A"/><circle cx="41" cy="12" r="1.6" fill="#FFF59D"/>',
  lotusp: () => '<path d="M14 44 Q30 52 46 44 Q30 48 14 44Z" fill="#3DBE55"/>' + [-50, -25, 25, 50, 0].map(a => '<ellipse cx="30" cy="27" rx="7" ry="15" fill="' + (a === 0 ? '#FF6F91' : '#FF9BB5') + '" stroke="#D94A73" stroke-width="1.3" transform="rotate(' + a + ' 30 42)"/>').join(''),
  lotusw: () => '<path d="M14 44 Q30 52 46 44 Q30 48 14 44Z" fill="#3DBE55"/>' + [-50, -25, 25, 50, 0].map(a => '<ellipse cx="30" cy="27" rx="7" ry="15" fill="' + (a === 0 ? '#FFFFFF' : '#F3F7FB') + '" stroke="#9FB3C8" stroke-width="1.3" transform="rotate(' + a + ' 30 42)"/>').join('') + '<circle cx="30" cy="34" r="3" fill="#FFD24A"/>',
  jasmine: () => petalRing(5, 10, 7, 11, '#FFFFFF', '#B9C9D9') + '<circle cx="30" cy="30" r="4.5" fill="#FFE066" stroke="#E0B800" stroke-width="1"/>',
  bel: () => '<path d="M30 56 V34" stroke="#3E8E3E" stroke-width="3" stroke-linecap="round"/>' +
    ['M30 34 C18 30 14 14 24 6 C32 12 34 26 30 34Z', 'M30 34 C22 42 6 42 4 30 C14 24 26 28 30 34Z', 'M30 34 C38 42 54 42 56 30 C46 24 34 28 30 34Z'].map(d => '<path d="' + d + '" fill="#5CB85C" stroke="#2E7D32" stroke-width="1.4"/>').join('') +
    '<path d="M30 34 L25 12M30 34 L10 32M30 34 L50 32" stroke="#A5D6A7" stroke-width="1.2"/>',
  durva: () => [-30, -15, 0, 15, 30].map((a, i) => '<path d="M30 54 Q' + (30 + a * 0.4) + ' 30 ' + (30 + a * 0.8) + ' ' + (6 + Math.abs(a) * 0.3) + '" fill="none" stroke="' + (i % 2 ? '#43A047' : '#66BB6A') + '" stroke-width="3" stroke-linecap="round"/>').join('') + '<path d="M24 50 Q30 46 36 50" stroke="#E53935" stroke-width="3" fill="none"/>'
};
const DEITY_FLOWERS = {
  shiva: ['bel', 'jasmine', 'lotusw', 'bel', 'jasmine'],
  rudra: ['bel', 'jasmine', 'bel', 'lotusw', 'jasmine'],
  surya: ['hibiscus', 'lotusp', 'marigold', 'hibiscus', 'lotusp'],
  ganesha: ['hibiscus', 'durva', 'marigold', 'hibiscus', 'marigold'],
  lakshmi: ['lotusp', 'hibiscus', 'lotusp', 'marigold', 'lotusp'],
  saraswati: ['lotusw', 'jasmine', 'yellowm', 'lotusw', 'jasmine'],
  hanuman: ['marigold', 'hibiscus', 'marigold', 'hibiscus', 'marigold']
};
const FLOWER_NAME = { marigold: 'marigold', yellowm: 'yellow marigold', hibiscus: 'red hibiscus', lotusp: 'pink lotus', lotusw: 'white lotus', jasmine: 'jasmine', bel: 'bel leaf', durva: 'durva grass' };
const flowerSVG = (type, cls) => '<svg viewBox="0 0 60 60"' + (cls ? ' class="' + cls + '"' : '') + ' aria-hidden="true">' + FLOWER_ART[type]() + '</svg>';
const FLOWER_ICON = '<svg viewBox="0 0 60 60" aria-hidden="true">' + petalRing(6, 12, 9, 12, '#FF8FAB', '#E0456F') + '<circle cx="30" cy="30" r="7" fill="#FFC83D" stroke="#FF9F1C" stroke-width="1.5"/></svg>';
const flowersOf = id => +((state.flowers || {})[id]) || 0;
/* Offered flowers resting at the deity's feet (deterministic layout) */
function pileHTML(m, max) {
  const n = Math.min(flowersOf(m.id), max || 18), types = DEITY_FLOWERS[m.deity];
  let s = '';
  for (let i = 0; i < n; i++) {
    const row = i % 3, t = (i * 0.618034) % 1;
    const x = 50 + (t - 0.5) * (58 - row * 10), y = 2 + row * 4 + ((i * 7) % 3);
    s += '<span class="pf" style="left:' + x.toFixed(1) + '%;bottom:' + y.toFixed(1) + '%;transform:translate(-50%,0) rotate(' + ((i * 47) % 50 - 25) + 'deg)">' + flowerSVG(types[i % types.length]) + '</span>';
  }
  return s;
}
function basketSVG(part) {
  if (part === 'back') return '<svg class="bk-back" viewBox="0 0 320 120" aria-hidden="true"><ellipse cx="160" cy="44" rx="150" ry="26" fill="#8A5A2B"/><ellipse cx="160" cy="44" rx="138" ry="18" fill="#5E3A17"/></svg>';
  let weave = '';
  for (let x = 24; x < 300; x += 18) weave += '<path d="M' + x + ' 46 Q' + (x + 4) + ' 82 ' + (x + 10) + ' 112" stroke="#A8702F" stroke-width="3" fill="none"/>';
  for (let y = 58; y < 112; y += 14) weave += '<path d="M' + (12 + (y - 44) * 0.35) + ' ' + y + ' Q160 ' + (y + 16) + ' ' + (308 - (y - 44) * 0.35) + ' ' + y + '" stroke="#E0A060" stroke-width="5" fill="none" opacity=".75"/>';
  return '<svg class="bk-front" viewBox="0 0 320 120" aria-hidden="true"><path d="M10 44 Q160 84 310 44 L290 108 Q160 128 30 108Z" fill="#C98B4A" stroke="#8A5A2B" stroke-width="3"/>' + weave +
    '<path d="M10 44 Q160 84 310 44" fill="none" stroke="#8A5A2B" stroke-width="7" stroke-linecap="round"/></svg>';
}
function picture(name) {
  const u = uid();
  const st = (x, y, R, r, fill, cls) => '<path class="tw' + (cls ? ' ' + cls : '') + '" d="' + starPath(x, y, R, r) + '" fill="' + fill + '"/>';
  let s = '<svg viewBox="0 0 300 200" role="img" preserveAspectRatio="xMidYMid slice" aria-label="' + (PIC_LABEL[name] || '') + '">';
  if (name === 'sunrise') {
    s += '<defs><linearGradient id="' + u + 's" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6FBDF5"/><stop offset=".55" stop-color="#FFD9A6"/><stop offset="1" stop-color="#FFB870"/></linearGradient></defs>' +
      '<rect width="300" height="200" fill="url(#' + u + 's)"/>' +
      st(34, 26, 9, 3.6, '#FFF7C2') + st(266, 22, 8, 3.2, '#FFF7C2', 'd2') + st(236, 48, 5, 2, '#FFF7C2', 'd3') + st(70, 50, 5, 2, '#FFF7C2', 'd2') +
      cloud(60, 88, 0.9) + cloud(210, 76, 0.75) +
      '<g class="rise">' + sunFace(150, 124, 38, u, { raysClass: 'spin-slow' }) + '</g>' +
      '<path d="M112 70 q6 -6 12 0 q6 -6 12 0M178 58 q5 -5 10 0 q5 -5 10 0" fill="none" stroke="#5A2D0C" stroke-width="3" stroke-linecap="round" class="float"/>' +
      '<path d="M0 150 Q70 112 150 146 T300 138 V200 H0Z" fill="#79CF63"/>' +
      '<path d="M0 172 Q90 138 180 170 T300 166 V200 H0Z" fill="#43AE4A"/>' +
      '<circle cx="40" cy="176" r="5" fill="#FF6F91"/><circle cx="52" cy="182" r="4" fill="#FFC83D"/><circle cx="252" cy="182" r="5" fill="#FF6F91"/>';
  } else if (name === 'sun') {
    s += '<defs><radialGradient id="' + u + 'b" cx="50%" cy="45%" r="75%"><stop offset="0" stop-color="#FFF7C8"/><stop offset=".6" stop-color="#FFD98A"/><stop offset="1" stop-color="#FFAA55"/></radialGradient></defs>' +
      '<rect width="300" height="200" fill="url(#' + u + 'b)"/>' +
      cloud(22, 168, 0.8) + cloud(236, 172, 0.8) +
      '<g transform="translate(50 -2) scale(1.02)">' + suryaGroup(u) + '</g>' +
      st(34, 40, 10, 4, '#fff') + st(266, 44, 9, 3.6, '#fff', 'd2') + st(40, 120, 7, 3, '#fff', 'd3') + st(262, 118, 8, 3.2, '#fff');
  } else if (name === 'glow') {
    s += '<defs><linearGradient id="' + u + 'g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD7A0"/><stop offset="1" stop-color="#FFB27A"/></linearGradient>' +
      '<radialGradient id="' + u + 'h"><stop offset="0" stop-color="#FFFBE0"/><stop offset=".5" stop-color="#FFE9A0" stop-opacity=".9"/><stop offset="1" stop-color="#FFD27A" stop-opacity="0"/></radialGradient>' +
      diyaDefs(u) + '</defs>' +
      '<rect width="300" height="200" fill="url(#' + u + 'g)"/>' +
      '<circle cx="150" cy="92" r="96" fill="url(#' + u + 'h)" class="pulse-glow"/>' +
      st(60, 36, 8, 3.2, '#fff') + st(244, 34, 9, 3.6, '#fff', 'd2') + st(262, 96, 6, 2.4, '#fff', 'd3') + st(38, 104, 6, 2.4, '#fff', 'd3') +
      '<ellipse cx="150" cy="186" rx="84" ry="14" fill="#E07B3A" opacity=".35"/>' +
      '<ellipse cx="150" cy="176" rx="64" ry="17" fill="#8B6CEF"/>' +
      '<path d="M112 176 Q114 128 128 120 L172 120 Q186 128 188 176Z" fill="#FF8A1F"/>' +
      '<path d="M150 120v56" stroke="#FFC83D" stroke-width="4"/>' +
      '<path d="M143 150 L150 122 L157 150 Q150 154 143 150Z" fill="#C98B5A" stroke="#A8703F" stroke-width="1.5"/>' +
      '<rect x="142" y="104" width="16" height="14" fill="#C98B5A"/>' +
      childHead(150, 84, 25, true) +
      '<circle cx="150" cy="68" r="2.6" fill="#E53935"/>' +
      diya(62, 186, 1, u) + diya(238, 186, 1, u);
  } else if (name === 'idea') {
    s += '<defs><linearGradient id="' + u + 'i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9EDCFF"/><stop offset="1" stop-color="#C9F2E4"/></linearGradient>' +
      '<radialGradient id="' + u + 'l"><stop offset="0" stop-color="#FFF9C4"/><stop offset="1" stop-color="#FFE066" stop-opacity="0"/></radialGradient></defs>' +
      '<rect width="300" height="200" fill="url(#' + u + 'i)"/>' +
      '<circle cx="150" cy="48" r="46" fill="url(#' + u + 'l)" class="pulse-glow"/>' +
      '<g stroke="#FFB020" stroke-width="5" stroke-linecap="round" class="pulse-glow"><path d="M150 10v-6M118 20l-5-5M182 20l5-5M106 48h-8M194 48h8M116 76l-5 4M184 76l5 4"/></g>' +
      '<path d="M150 22a24 24 0 0 0-14 43c3 3 4 6 4 9h20c0-3 1-6 4-9a24 24 0 0 0-14-43z" fill="#FFE066" stroke="#FFB020" stroke-width="3"/>' +
      '<path d="M144 60q6-10 12 0" fill="none" stroke="#FF9F1C" stroke-width="3" stroke-linecap="round"/>' +
      '<rect x="140" y="75" width="20" height="6" rx="3" fill="#9AA5B1"/><rect x="142" y="82" width="16" height="5" rx="2.5" fill="#7B8794"/>' +
      '<path d="M92 200 Q96 160 150 158 Q204 160 208 200Z" fill="#16B3A3"/>' +
      '<path d="M136 158 L150 176 L164 158Z" fill="#fff" opacity=".8"/>' +
      '<rect x="141" y="146" width="18" height="14" fill="#C98B5A"/>' +
      childHead(150, 124, 30, false) +
      '<g class="float"><path d="M232 104c-6-8-20-4-18 7 2 8 18 18 18 18s16-10 18-18c2-11-12-15-18-7z" fill="#FF6F91"/></g>' +
      st(68, 110, 12, 5, '#FFC83D') + st(250, 40, 7, 3, '#fff', 'd2') + st(46, 44, 7, 3, '#fff', 'd3');
  }
  return s + '</svg>';
}


/* Themed backdrop + deity, 300x200 (used on activity screens and home cards) */
const SCENE_BG = {
  shiva: ['#CFE9FF', '#EAF6FF', '#FFFFFF'],
  rudra: ['#5B3FA8', '#8E6CE0', '#C9B6FF'],
  ganesha: ['#FFE3B0', '#FFD08A', '#FFB86B'],
  lakshmi: ['#FFE0EA', '#FFC7D8', '#FFB0C8'],
  saraswati: ['#EAF6FF', '#FFFFFF', '#DDF0FB'],
  hanuman: ['#8FD0FF', '#BFE6FF', '#FFE7B8'],
  surya: ['#FFF7C8', '#FFD98A', '#FFAA55']
};
function sceneDecor(key, u) {
  const st = (x, y, R, r, fill, cls) => '<path class="tw' + (cls ? ' ' + cls : '') + '" d="' + starPath(x, y, R, r) + '" fill="' + fill + '"/>';
  if (key === 'shiva') return '<path d="M0 150 L40 96 L66 124 L104 70 L150 130 L190 80 L232 128 L262 92 L300 136 V200 H0Z" fill="#FFFFFF" stroke="#BCD9F0" stroke-width="2"/>' +
    '<path d="M40 96 L50 110 L32 108Z M104 70 L118 88 L92 86Z M190 80 L204 98 L178 96Z M262 92 L272 106 L254 104Z" fill="#D7ECFB"/>' +
    '<path d="M0 176 Q150 160 300 176 V200 H0Z" fill="#B9E0F7"/>' + st(30, 30, 7, 3, '#fff') + st(270, 36, 8, 3.2, '#fff', 'd2');
  if (key === 'rudra') return st(30, 26, 7, 3, '#FFF7C2') + st(268, 24, 8, 3.2, '#FFF7C2', 'd2') + st(250, 70, 5, 2, '#FFF7C2', 'd3') + st(48, 76, 5, 2, '#FFF7C2', 'd2') + st(22, 130, 6, 2.4, '#FFF7C2', 'd3') + st(280, 140, 6, 2.4, '#FFF7C2') +
    '<path d="M270 40 A16 16 0 1 0 288 62 A12 12 0 1 1 270 40Z" fill="#FFF7CC"/>' +
    '<path d="M0 170 L50 132 L90 160 L140 124 L200 162 L250 130 L300 158 V200 H0Z" fill="#3E2A7A"/>';
  if (key === 'ganesha') { let g = ''; for (let i = 0; i < 15; i++) { const x = 10 + i * 20, y = 12 + Math.sin(i / 14 * Math.PI) * 26; g += '<circle cx="' + x + '" cy="' + fx(y) + '" r="8" fill="' + (i % 2 ? '#FF9F1C' : '#FFC83D') + '" stroke="#E07B00" stroke-width="1"/>'; }
    return '<path d="M0 12 Q150 64 300 12" fill="none" stroke="#3DBE55" stroke-width="2"/>' + g + '<path d="M0 182 H300 V200 H0Z" fill="#E88A3A"/>' + '<path d="M0 182 H300" stroke="#C45E1A" stroke-width="3"/>'; }
  if (key === 'lakshmi') return '<defs>' + diyaDefs(u) + '</defs>' + st(34, 34, 8, 3.2, '#fff') + st(266, 30, 9, 3.6, '#fff', 'd2') + st(250, 110, 6, 2.4, '#FFD24A', 'd3') + st(46, 112, 6, 2.4, '#FFD24A', 'd2') +
    '<path d="M0 184 Q150 168 300 184 V200 H0Z" fill="#7FD1C3"/>' + diya(28, 190, 0.9, u) + diya(272, 190, 0.9, u);
  if (key === 'saraswati') return '<path d="M0 178 Q150 164 300 178 V200 H0Z" fill="#9ED6FF"/>' +
    '<g transform="translate(26 176) scale(.9)">' + whiteLotus() + '</g><g transform="translate(274 178) scale(.8)">' + whiteLotus() + '</g>' +
    '<g class="float" fill="#6B8FD9"><path d="M28 56 v-20 l12 -4 v20" fill="none" stroke="#6B8FD9" stroke-width="3"/><ellipse cx="25" cy="57" rx="5" ry="4"/><ellipse cx="37" cy="53" rx="5" ry="4"/>' +
    '<path d="M268 44 v-18" stroke="#6B8FD9" stroke-width="3"/><ellipse cx="265" cy="45" rx="5" ry="4"/></g>';
  if (key === 'hanuman') return sunFace(262, 34, 18, u) + cloud(14, 60, 0.8) + cloud(232, 110, 0.7) + cloud(8, 150, 0.7) +
    '<path d="M0 186 Q60 170 120 184 T300 180 V200 H0Z" fill="#79CF63"/>';
  if (key === 'surya') return cloud(22, 168, 0.8) + cloud(236, 172, 0.8) + st(34, 40, 10, 4, '#fff') + st(266, 44, 9, 3.6, '#fff', 'd2') + st(40, 120, 7, 3, '#fff', 'd3') + st(262, 118, 8, 3.2, '#fff');
  return '';
}
function whiteLotus() {
  let p = '';
  [-50, -25, 25, 50, 0].forEach(a => { p += '<ellipse cx="0" cy="-11" rx="6" ry="12" fill="#FFFFFF" stroke="#9FB3C8" stroke-width="1.2" transform="rotate(' + a + ' 0 2)"/>'; });
  return p + '<ellipse cx="0" cy="4" rx="16" ry="4" fill="#3DBE55"/>';
}
function deityScene(key, opts) {
  opts = opts || {};
  const u = uid(), c = SCENE_BG[key] || SCENE_BG.surya, d = DEITIES[key];
  const vb = opts.card ? '50 0 200 200' : '0 0 300 200';
  return '<svg viewBox="' + vb + '" role="img" preserveAspectRatio="xMidYMid ' + (opts.card ? 'meet' : 'slice') + '" aria-label="' + esc(d.name) + '">' +
    '<defs><linearGradient id="' + u + 'bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + c[0] + '"/><stop offset=".6" stop-color="' + c[1] + '"/><stop offset="1" stop-color="' + c[2] + '"/></linearGradient></defs>' +
    '<rect x="0" y="0" width="300" height="200" fill="url(#' + u + 'bg)"/>' + sceneDecor(key, u) +
    '<g transform="translate(50 0)">' + d.draw(u) + '</g></svg>';
}

/* 12 stickers */
const STICKERS = [
  u => '<g transform="translate(-4 -2) scale(.54)">' + drawGanesha(u) + '</g>',
  u => '<g transform="translate(-4 -2) scale(.54)">' + drawHanuman(u) + '</g>',
  u => sunFace(50, 50, 26, u),
  () => '<path d="M60 16a34 34 0 1 0 26 54 28 28 0 1 1-26-54z" fill="#FFD54A" stroke="#F2A900" stroke-width="3"/><path d="' + starPath(78, 22, 7, 3) + '" fill="#8B6CEF"/><path d="' + starPath(84, 44, 5, 2) + '" fill="#8B6CEF"/><circle cx="42" cy="50" r="3" fill="#5A2D0C"/><path d="M36 62q6 5 12 0" fill="none" stroke="#5A2D0C" stroke-width="3" stroke-linecap="round"/>',
  () => '<path d="' + starPath(50, 54, 42, 19) + '" fill="#FFC83D" stroke="#E8590C" stroke-width="4" stroke-linejoin="round"/><circle cx="42" cy="50" r="4" fill="#5A2D0C"/><circle cx="58" cy="50" r="4" fill="#5A2D0C"/><path d="M42 61q8 7 16 0" fill="none" stroke="#5A2D0C" stroke-width="3.5" stroke-linecap="round"/>',
  () => { let p = ''; [-60, -30, 60, 30, 0].forEach(a => { p += '<ellipse cx="50" cy="44" rx="10" ry="26" fill="' + (a === 0 ? '#FF6F91' : '#FF9BB5') + '" stroke="#E0456F" stroke-width="2" transform="rotate(' + a + ' 50 70)"/>'; }); return p + '<ellipse cx="50" cy="76" rx="38" ry="8" fill="#4CCB63"/>'; },
  u => '<defs>' + diyaDefs(u) + '</defs>' + diya(50, 80, 1.55, u),
  () => { let p = ''; for (let i = 0; i < 6; i++) p += '<circle cx="50" cy="26" r="15" fill="#FF8FAB" transform="rotate(' + (i * 60) + ' 50 50)"/>'; return p + '<circle cx="50" cy="50" r="15" fill="#FFC83D" stroke="#FF9F1C" stroke-width="3"/>'; },
  () => { const c = ['#FF5A5A', '#FF9F1C', '#FFD54A', '#3DBE55', '#3FA7F5', '#8B6CEF']; let p = ''; c.forEach((col, i) => { const r = 42 - i * 6; p += '<path d="M' + (50 - r) + ' 72a' + r + ' ' + r + ' 0 0 1 ' + (2 * r) + ' 0" fill="none" stroke="' + col + '" stroke-width="6"/>'; }); return p + cloud(8, 76, 0.5) + cloud(70, 76, 0.5); },
  () => '<ellipse cx="32" cy="38" rx="20" ry="16" fill="#8B6CEF" transform="rotate(-20 32 38)"/><ellipse cx="68" cy="38" rx="20" ry="16" fill="#8B6CEF" transform="rotate(20 68 38)"/><ellipse cx="34" cy="64" rx="15" ry="12" fill="#FF8FAB"/><ellipse cx="66" cy="64" rx="15" ry="12" fill="#FF8FAB"/><circle cx="30" cy="38" r="6" fill="#FFD54A"/><circle cx="70" cy="38" r="6" fill="#FFD54A"/><rect x="46" y="28" width="8" height="48" rx="4" fill="#5A2D0C"/><path d="M48 28q-6-12-12-14M52 28q6-12 12-14" fill="none" stroke="#5A2D0C" stroke-width="3" stroke-linecap="round"/>',
  () => '<ellipse cx="50" cy="40" rx="26" ry="31" fill="#FF5A5A"/><ellipse cx="40" cy="30" rx="6" ry="10" fill="#fff" opacity=".5"/><path d="M46 70l4 6 4-6z" fill="#E53935"/><path d="M50 76q-8 10 0 20" fill="none" stroke="#9A5A2A" stroke-width="2.5"/>',
  () => '<path d="M50 86C20 66 10 50 14 34c4-16 26-20 36-4 10-16 32-12 36 4 4 16-6 32-36 52z" fill="#FF6F91" stroke="#E0456F" stroke-width="3"/><ellipse cx="32" cy="36" rx="6" ry="9" fill="#fff" opacity=".45"/>',
  () => '<path d="M72 50l20-16v32z" fill="#FF9F1C"/><ellipse cx="44" cy="50" rx="34" ry="22" fill="#3FA7F5"/><path d="M30 34q10 16 0 32M44 30q10 20 0 40" fill="none" stroke="#9ED6FF" stroke-width="3"/><circle cx="24" cy="46" r="5" fill="#fff"/><circle cx="23" cy="46" r="2.6" fill="#1B3A5A"/><circle cx="84" cy="22" r="4" fill="none" stroke="#9ED6FF" stroke-width="2"/><circle cx="92" cy="12" r="3" fill="none" stroke="#9ED6FF" stroke-width="2"/>',
  () => '<ellipse cx="50" cy="58" rx="28" ry="24" fill="#3DBE55"/><circle cx="50" cy="34" r="18" fill="#4CD964"/><path d="M66 34l14 5-14 5z" fill="#FF9F1C"/><circle cx="56" cy="30" r="4" fill="#1E3A1E"/><path d="M34 56q14 16 30 0" fill="#2E9E44"/><path d="M40 80l-4 10M58 80l4 10" stroke="#FF9F1C" stroke-width="4" stroke-linecap="round"/><path d="M42 18q4-10 12-8" fill="none" stroke="#FF5A5A" stroke-width="4" stroke-linecap="round"/>'
];
const stickerSVG = i => '<svg viewBox="0 0 100 100" aria-hidden="true">' + STICKERS[i % STICKERS.length](uid()) + '</svg>';

/* ------------------------------------------------------------------ */
/* Sound effects (Web Audio, no files)                                 */
/* ------------------------------------------------------------------ */
let actx = null;
function audioCtx() {
  try {
    if (!actx) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; actx = new C(); }
    if (actx.state === 'suspended') actx.resume().catch(() => {});
    return actx;
  } catch (e) { return null; }
}
document.addEventListener('pointerdown', audioCtx, { passive: true });
function tone(freq, when, dur, type, vol) {
  const c = actx; if (!c || c.state !== 'running') return;
  const t = c.currentTime + (when || 0), o = c.createOscillator(), g = c.createGain();
  o.type = type || 'sine'; o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.15, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + 0.05);
}
const sfx = {
  chime() { [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.1, 0.7, 'sine', 0.14)); },
  pop() { tone(660, 0, 0.15, 'triangle', 0.12); tone(990, 0.05, 0.15, 'sine', 0.08); },
  soft() { tone(440, 0, 0.18, 'sine', 0.06); },
  clap(hit) {
    const c = actx; if (!c || c.state !== 'running') return;
    const len = Math.floor(c.sampleRate * 0.12), b = c.createBuffer(1, len, c.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    const src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    src.buffer = b; f.type = 'bandpass'; f.frequency.value = 1400; f.Q.value = 0.8; g.gain.value = 0.5;
    src.connect(f).connect(g).connect(c.destination); src.start();
    if (hit) tone(1318.5, 0.02, 0.35, 'sine', 0.08);
  }
};

/* ------------------------------------------------------------------ */
/* IndexedDB recordings                                                */
/* ------------------------------------------------------------------ */
const DB = {
  p: null,
  open() {
    if (this.p) return this.p;
    this.p = new Promise((res, rej) => {
      if (!('indexedDB' in window)) { rej(new Error('IndexedDB unavailable')); return; }
      const r = indexedDB.open('gayatri-kids', 2);
      r.onupgradeneeded = e => {
        const db = r.result;
        if (!db.objectStoreNames.contains('rec')) { db.createObjectStore('rec'); return; }
        if (e.oldVersion === 1) {
          /* v1 (Gayatri-only) stored keys line0..line3 and full: move them under gayatri/ */
          const st = r.transaction.objectStore('rec');
          st.openCursor().onsuccess = ev => {
            const c = ev.target.result; if (!c) return;
            const k = c.key;
            if (typeof k === 'string' && k.indexOf('/') < 0) { st.put(c.value, 'gayatri/' + k); st.delete(k); }
            c.continue();
          };
        }
      };
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
    this.p.catch(() => { this.p = null; });
    return this.p;
  },
  async tx(mode, fn) {
    const db = await this.open();
    return new Promise((res, rej) => {
      const t = db.transaction('rec', mode), rq = fn(t.objectStore('rec'));
      t.oncomplete = () => res(rq && rq.result);
      t.onerror = () => rej(t.error);
      t.onabort = () => rej(t.error);
    });
  },
  get(k) { return this.tx('readonly', st => st.get(k)).then(v => v || null).catch(() => null); },
  put(k, v) { return this.tx('readwrite', st => st.put(v, k)); },
  del(k) { return this.tx('readwrite', st => st.delete(k)); }
};

/* Recording analysis: find speech start/end and silent gaps so highlighting follows the voice. */
const recCache = new Map();
function invalidateRec(key) { const c = recCache.get(key); if (c && c.url) URL.revokeObjectURL(c.url); recCache.delete(key); }
async function getRec(key) {
  if (recCache.has(key)) return recCache.get(key);
  const r = await DB.get(key);
  if (!r || !r.data) { recCache.set(key, null); return null; }
  const url = URL.createObjectURL(new Blob([r.data], { type: r.type || 'audio/webm' }));
  const info = { url, dur: r.duration || 0, start: 0, end: r.duration || 0, gaps: [] };
  try {
    const OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    const ab = await new Promise((res, rej) => {
      const oc = new OAC(1, 44100, 44100);
      const p = oc.decodeAudioData(r.data.slice(0), res, rej);
      if (p && p.then) p.then(res, rej);
    });
    const ch = ab.getChannelData(0), sr = ab.sampleRate, fl = Math.max(1, Math.round(sr * 0.02)), n = Math.floor(ch.length / fl);
    info.dur = ab.duration;
    if (n > 5) {
      const rms = new Float32Array(n);
      for (let i = 0; i < n; i++) { let s = 0; for (let j = i * fl, e = j + fl; j < e; j++) s += ch[j] * ch[j]; rms[i] = Math.sqrt(s / fl); }
      const sorted = Array.from(rms).sort((a, b) => a - b);
      const floor = sorted[Math.floor(n * 0.1)], peak = sorted[Math.floor(n * 0.98)];
      const thr = floor + (peak - floor) * 0.12;
      let a = 0, b = n - 1;
      while (a < n && rms[a] < thr) a++;
      while (b > a && rms[b] < thr) b--;
      if (b > a) {
        info.start = Math.max(0, a * 0.02 - 0.05); info.end = Math.min(info.dur, (b + 1) * 0.02 + 0.05);
        let runStart = -1;
        for (let i = a; i <= b; i++) {
          if (rms[i] < thr) { if (runStart < 0) runStart = i; }
          else if (runStart >= 0) { if (i - runStart >= 6) info.gaps.push({ s: runStart * 0.02, e: i * 0.02 }); runStart = -1; }
        }
      } else { info.start = 0; info.end = info.dur; }
    }
  } catch (e) { /* undecodable: proportional timing */ }
  if (!info.end || !isFinite(info.end)) info.end = info.dur || 4;
  recCache.set(key, info);
  return info;
}
const chunkWeight = c => 0.75 + 0.08 * c.length;
const lineWeight = L => L.chunks.reduce((x, c) => x + chunkWeight(c), 0);
function chunkStarts(L, a, b) {
  const ws = L.chunks.map(chunkWeight), tot = ws.reduce((x, y) => x + y, 0);
  const out = []; let t = a;
  ws.forEach(w => { out.push(t); t += (b - a) * w / tot; });
  return out;
}
function segmentsFor(info, m, lineIdxs) {
  const s = info.start, e = info.end > s ? info.end : info.dur, D = e - s;
  const lw = lineIdxs.map(li => lineWeight(m.lines[li]));
  const tot = lw.reduce((x, y) => x + y, 0);
  let bounds = [], acc = s;
  lw.forEach(w => { bounds.push([acc, acc + D * w / tot]); acc += D * w / tot; });
  if (lineIdxs.length > 1 && info.gaps.length) {
    const chosen = []; let ok = true, prevEnd = s;
    for (let k = 0; k < lineIdxs.length - 1; k++) {
      const expect = bounds[k][1];
      const cands = info.gaps.filter(g => g.s > prevEnd + 0.3 && Math.abs((g.s + g.e) / 2 - expect) < D * 0.2);
      if (!cands.length) { ok = false; break; }
      const g = cands.reduce((m, x) => (x.e - x.s > m.e - m.s ? x : m));
      chosen.push(g); prevEnd = g.e;
    }
    if (ok) {
      const nb = []; let cur = s;
      chosen.forEach(g => { nb.push([cur, g.s]); cur = g.e; });
      nb.push([cur, e]);
      if (nb.every(x => x[1] - x[0] > 0.35)) bounds = nb;
    }
  }
  return lineIdxs.map((li, k) => ({ line: li, a: bounds[k][0], b: bounds[k][1], cuts: chunkStarts(m.lines[li], bounds[k][0], bounds[k][1]) }));
}

/* ------------------------------------------------------------------ */
/* Player: recordings first, then speechSynthesis, then silent timing  */
/* ------------------------------------------------------------------ */
const Player = {
  tok: 0, audio: null,
  stop() {
    this.tok++;
    try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch (e) {}
    if (this.audio) { try { this.audio.pause(); } catch (e) {} this.audio = null; }
  },
  begin() { this.stop(); return this.tok; }
};
const alive = tok => tok === Player.tok;
const sleep = (ms, tok) => new Promise(res => { const t0 = performance.now(); const iv = setInterval(() => { if (!alive(tok) || performance.now() - t0 >= ms) { clearInterval(iv); res(alive(tok)); } }, 50); });

let voices = [];
function refreshVoices() { try { voices = speechSynthesis.getVoices() || []; } catch (e) { voices = []; } }
if ('speechSynthesis' in window) { refreshVoices(); try { speechSynthesis.addEventListener('voiceschanged', refreshVoices); } catch (e) {} }
function pickVoice() {
  return voices.find(v => /^hi[-_]IN$/i.test(v.lang)) || voices.find(v => /^hi\b/i.test(v.lang)) ||
    voices.find(v => /^(mr|sa|ne)\b/i.test(v.lang)) || null;
}
function voiceStatus() {
  if (!('speechSynthesis' in window)) return 'This browser has no built-in voice, so syllables light up silently. Please record your voice above.';
  const v = pickVoice();
  if (v) return 'Built-in voice: ' + v.name + ' (' + v.lang + '), slow speed 0.6.';
  if (!voices.length) return 'Built-in voice: the phone\u2019s default Hindi (hi-IN) voice is used if it has one.';
  return 'No Hindi voice found on this device, so an English voice reads the transliteration. Tip: add Hindi in Android Settings \u2192 Text-to-speech, or record your own voice.';
}

function playRecording(info, segs, onProg, tok) {
  return new Promise(res => {
    const a = new Audio(info.url);
    a.preload = 'auto';
    Player.audio = a;
    let raf = 0, finished = false, lastL = -1, lastC = -2;
    const emit = (l, c) => { if (l !== lastL || c !== lastC) { lastL = l; lastC = c; onProg(l, c); } };
    const guard = setInterval(() => { if (!alive(tok)) finish(false); }, 200);
    function finish(v) { if (finished) return; finished = true; cancelAnimationFrame(raf); clearInterval(guard); a.onended = a.onerror = null; try { a.pause(); } catch (e) {} if (Player.audio === a) Player.audio = null; res(v); }
    const tick = () => {
      if (!alive(tok)) return finish(false);
      const t = a.currentTime;
      let seg = segs[0];
      for (const sg of segs) if (t >= sg.a - 0.15) seg = sg;
      let c = -1;
      seg.cuts.forEach((ct, i) => { if (t >= ct - 0.05) c = i; });
      if (t > seg.b + 0.1) c = seg.cuts.length;
      emit(seg.line, c);
      raf = requestAnimationFrame(tick);
    };
    a.onended = () => { const last = segs[segs.length - 1]; emit(last.line, last.cuts.length); finish(true); };
    a.onerror = () => finish('error');
    const p = a.play();
    if (p && p.then) p.then(() => { raf = requestAnimationFrame(tick); }, () => finish('error'));
    else raf = requestAnimationFrame(tick);
  });
}

function speakLine(m, li, onChunk, tok) {
  return new Promise(res => {
    const L = m.lines[li], n = L.chunks.length, per = L.unit === 'word' ? 0.85 : 0.62;
    const ws = L.chunks.map(chunkWeight), tot = ws.reduce((x, y) => x + y, 0), total = n * per;
    const cuts = []; let acc = 0; ws.forEach(w => { cuts.push(acc); acc += total * w / tot; });
    let started = false, ended = false, silent = false, t0 = 0, raf = 0, wd = 0, cap = 0, done = false, last = -2;
    const guard = setInterval(() => { if (!alive(tok)) finish(false); }, 200);
    function finish(v) { if (done) return; done = true; cancelAnimationFrame(raf); clearTimeout(wd); clearTimeout(cap); clearInterval(guard); res(v); }
    const emit = c => { if (c !== last) { last = c; onChunk(c); } };
    const tick = () => {
      if (!alive(tok)) return finish(false);
      const t = (performance.now() - t0) / 1000;
      let c = 0; cuts.forEach((ct, i) => { if (t >= ct) c = i; });
      if (silent && t >= total) ended = true;
      if (ended) { emit(n); return finish(true); }
      emit(c);
      raf = requestAnimationFrame(tick);
    };
    const startTimer = isSilent => { if (started) return; started = true; silent = isSilent; t0 = performance.now(); tick(); };
    const hasTTS = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
    if (!hasTTS) { startTimer(true); return; }
    try {
      const u = new SpeechSynthesisUtterance();
      const v = pickVoice();
      if (v) { u.voice = v; u.lang = v.lang; u.text = L.ttsDeva; }
      else if (!voices.length) { u.lang = 'hi-IN'; u.text = L.ttsDeva; }
      else { const en = voices.find(x => /^en[-_]IN/i.test(x.lang)); if (en) u.voice = en; u.lang = en ? en.lang : 'en-IN'; u.text = L.tts || (L.halves ? L.halves.join('. ') : L.roman); }
      u.rate = 0.6; u.pitch = 1.05; u.volume = 1;
      u.onstart = () => startTimer(false);
      u.onend = () => { if (!started) startTimer(true); else ended = true; };
      u.onerror = () => { if (!started) startTimer(true); else ended = true; };
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
      wd = setTimeout(() => { if (!started) { try { speechSynthesis.cancel(); } catch (e) {} startTimer(true); } }, 1800);
      cap = setTimeout(() => { ended = true; }, (total * 3 + 6) * 1000);
    } catch (e) { startTimer(true); }
  });
}

async function playLine(m, li, onChunk, tok) {
  const info = await getRec(m.id + '/line' + li);
  if (!alive(tok)) return false;
  if (info) {
    const r = await playRecording(info, segmentsFor(info, m, [li]), (l, c) => onChunk(c), tok);
    if (r !== 'error') return r;
  }
  return speakLine(m, li, onChunk, tok);
}
/* Whole mantra: a parent's full recording if present, else line by line.
   `from` lets the Chalisa start at a chosen verse. */
async function playFull(m, onProg, tok, from) {
  from = from || 0;
  const n = m.lines.length;
  if (from === 0 && n > 1 && m.kind !== 'chalisa') {
    const info = await getRec(m.id + '/full');
    if (!alive(tok)) return false;
    if (info) {
      const r = await playRecording(info, segmentsFor(info, m, m.lines.map((_, i) => i)), onProg, tok);
      if (r !== 'error') return r;
    }
  }
  for (let i = from; i < n; i++) {
    onProg(i, -1);
    const ok = await playLine(m, i, c => onProg(i, c), tok);
    if (!ok || !alive(tok)) return false;
    if (i < n - 1 && !(await sleep(m.kind === 'chalisa' ? 700 : 450, tok))) return false;
  }
  return true;
}

/* Screen wake lock during long Listen loops (best effort) */
let wakeLock = null;
async function keepAwake(on) {
  try {
    if (on && 'wakeLock' in navigator && !wakeLock && document.visibilityState === 'visible') { wakeLock = await navigator.wakeLock.request('screen'); wakeLock.addEventListener('release', () => { wakeLock = null; }); }
    else if (!on && wakeLock) { await wakeLock.release(); wakeLock = null; }
  } catch (e) { wakeLock = null; }
}

/* ------------------------------------------------------------------ */
/* Soft tap sounds for the deity pictures (WebAudio, no files).        */
/* Separate from the voice/TTS code. Everything is quiet and gentle.   */
/* ------------------------------------------------------------------ */
const TS = {
  bus: null, log: [],
  out() {
    const c = audioCtx(); if (!c || c.state !== 'running') return null;
    if (!this.bus || this.bus.context !== c) {
      const g = c.createGain(); g.gain.value = 0.55;
      const comp = c.createDynamicsCompressor(); comp.threshold.value = -20; comp.ratio.value = 4;
      g.connect(comp).connect(c.destination); this.bus = g;
    }
    return c;
  },
  env(c, t, a, d, vol) { const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + d); g.connect(this.bus); return g; },
  osc(c, type, f, t, dur, dest, f2) { const o = c.createOscillator(); o.type = type; o.frequency.setValueAtTime(f, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur * 0.8); o.connect(dest); o.start(t); o.stop(t + dur + 0.05); return o; },
  play(name, arg) {
    this.log.push(name); if (this.log.length > 50) this.log.shift();
    const c = this.out(); if (!c) return;
    const t = c.currentTime + 0.01, fn = this[name + 'S']; if (fn) fn.call(this, c, t, arg);
  },
  /* temple bell: inharmonic partials, long soft decay */
  bellS(c, t, f) { f = f || 660; [[1, 0.09], [2.76, 0.035], [5.4, 0.015], [0.5, 0.03]].forEach(([k, v]) => this.osc(c, 'sine', f * k, t, 2.2, this.env(c, t, 0.005, 2.2 / Math.sqrt(k), v))); },
  chimeS(c, t) { [1318.5, 1568, 1975.5, 2637].forEach((f, i) => this.osc(c, 'sine', f, t + i * 0.09, 0.9, this.env(c, t + i * 0.09, 0.005, 0.9, 0.035))); },
  sparkleS(c, t) { [2093, 2637, 3136].forEach((f, i) => this.osc(c, 'sine', f, t + i * 0.06, 0.4, this.env(c, t + i * 0.06, 0.004, 0.4, 0.02))); },
  /* plucked string (Karplus-Strong), used for the veena */
  pluckS(c, t, f) {
    f = f || 293.7; const sr = c.sampleRate, n = Math.floor(sr * 1.4), p = Math.max(2, Math.round(sr / f));
    const b = c.createBuffer(1, n, sr), d = b.getChannelData(0);
    for (let i = 0; i < p; i++) d[i] = Math.random() * 2 - 1;
    for (let i = p; i < n; i++) d[i] = 0.497 * (d[i - p] + d[i - p + 1]);
    const s = c.createBufferSource(); s.buffer = b; const g = c.createGain(); g.gain.value = 0.16; const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2600;
    s.connect(lp).connect(g).connect(this.bus); s.start(t);
  },
  veenaS(c, t) { [293.7, 370, 440, 587.3].forEach((f, i) => this.pluckS(c, t + i * 0.16, f)); },
  /* soft conch-like tone: low sine, slow swell, gentle vibrato */
  conchS(c, t) {
    const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.06, t + 0.35); g.gain.setValueAtTime(0.06, t + 0.9); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6); g.connect(this.bus);
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900; lp.connect(g);
    const o = this.osc(c, 'triangle', 220, t, 1.6, lp); o.frequency.linearRampToValueAtTime(233, t + 0.5);
    const v = c.createOscillator(), vg = c.createGain(); v.frequency.value = 5; vg.gain.value = 3; v.connect(vg).connect(o.frequency); v.start(t); v.stop(t + 1.7);
    this.osc(c, 'sine', 440, t, 1.6, this.env(c, t + 0.1, 0.3, 1.1, 0.015));
  },
  /* damaru: quick soft drum taps */
  damaruS(c, t) { [0, 0.12, 0.24, 0.36].forEach((dt, i) => this.osc(c, 'sine', i % 2 ? 190 : 150, t + dt, 0.14, this.env(c, t + dt, 0.003, 0.13, 0.16), 70)); },
  squeakS(c, t) { this.osc(c, 'sine', 1700, t, 0.09, this.env(c, t, 0.005, 0.08, 0.03), 2300); this.osc(c, 'sine', 1900, t + 0.12, 0.08, this.env(c, t + 0.12, 0.005, 0.07, 0.025), 2500); },
  tootS(c, t) { const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1200; lp.connect(this.env(c, t, 0.04, 0.35, 0.06)); this.osc(c, 'triangle', 330, t, 0.4, lp, 392); },
  popS(c, t) { this.osc(c, 'sine', 520, t, 0.12, this.env(c, t, 0.004, 0.11, 0.07), 880); },
  coinS(c, t) { [2093, 2637, 2349, 3136].forEach((f, i) => this.osc(c, 'sine', f, t + i * 0.07, 0.3, this.env(c, t + i * 0.07, 0.003, 0.28, 0.025))); },
  waterS(c, t) { [1046.5, 1318.5, 1174.7, 1568, 1396.9].forEach((f, i) => this.osc(c, 'sine', f, t + i * 0.08, 0.25, this.env(c, t + i * 0.08, 0.004, 0.22, 0.025), f * 1.3)); },
  whooshS(c, t) {
    const n = Math.floor(c.sampleRate * 0.7), b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    const s = c.createBufferSource(); s.buffer = b; const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 1.2; bp.frequency.setValueAtTime(400, t); bp.frequency.exponentialRampToValueAtTime(1400, t + 0.6);
    s.connect(bp).connect(this.env(c, t, 0.2, 0.5, 0.05)); s.start(t);
  }
};

/* ------------------------------------------------------------------ */
/* Shared UI pieces                                                    */
/* ------------------------------------------------------------------ */
const OM_BADGE = '<svg viewBox="0 0 100 100" role="img" aria-label="Om"><circle cx="50" cy="50" r="50" fill="#FFD36B"/><text x="50" y="72" text-anchor="middle" font-size="62" font-weight="700" fill="#E8590C">ॐ</text></svg>';
function topbar(title, backTo, deity) {
  const isBack = backTo && backTo !== 'home';
  return '<div class="topbar"><button class="round-btn" data-nav="' + (backTo || 'home') + '" aria-label="' + (isBack ? 'Back' : 'Home') + '">' + (isBack ? ICON.back : ICON.home) + '</button>' +
    '<div class="title-chip"><span>' + esc(title) + '</span></div><div class="deity-badge' + (deity ? ' db-' + deity : '') + '">' + (deity ? deityBadge(deity) : OM_BADGE) + '</div></div>';
}
function chunksHTML(L) {
  let k = 0;
  const one = w => '<span class="word">' + w.map(c => '<span class="ch" data-i="' + (k++) + '">' + esc(c) + '</span>').join('') + '</span>';
  if (L.unit === 'word') {
    return '<div class="chunks words" aria-label="' + esc(L.roman) + '">' + L.rows.map(r => '<div class="half">' + r.map(w => '<span class="ch" data-i="' + (k++) + '">' + esc(w) + '</span>').join('') + '</div>').join('') + '</div>';
  }
  return '<div class="chunks" aria-label="' + esc(L.roman) + '">' + L.words.map(one).join('') + '</div>';
}
function devaHTML(L, id) {
  return L.deva2 ? '<div class="deva two"' + (id ? ' id="' + id + '"' : '') + ' lang="hi"><span>' + L.deva + '</span><span>' + L.deva2 + '</span></div>'
    : '<div class="deva"' + (id ? ' id="' + id + '"' : '') + ' lang="sa">' + L.deva + '</div>';
}
function setChunk(root, c, cls) {
  cls = cls || 'on';
  const other = cls === 'on' ? 'echo' : 'on';
  $$('.ch', root).forEach((el, i) => { el.classList.toggle(cls, i === c); el.classList.toggle('done', i < c); el.classList.remove(other); });
}
function meaningHTML(text) { return '<div class="meaning">' + ICON.parent + '<span>' + esc(text) + '</span></div>'; }
function dotsHTML(n, cur) { return n < 2 ? '' : '<div class="dots" aria-hidden="true">' + Array.from({ length: n }, (_, i) => '<span class="dot' + (i === cur ? ' on' : i < cur ? ' done' : '') + '"></span>').join('') + '</div>'; }
function beadsSVG(n, done) {
  const R = 46, cx = 59, cy = 59, br = n <= 3 ? 12 : n <= 11 ? 8 : 5.6;
  let s = '<svg class="beads" viewBox="0 0 118 118" role="img" aria-label="' + done + ' of ' + n + ' done"><circle cx="59" cy="59" r="' + R + '" fill="none" stroke="#E8A860" stroke-width="2" stroke-dasharray="3 4"/>';
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (n === 1 ? 0 : i * 2 * Math.PI / n);
    s += '<circle class="bead' + (i < done ? ' on' : i === done ? ' cur' : '') + '" cx="' + (cx + R * Math.cos(a)).toFixed(1) + '" cy="' + (cy + R * Math.sin(a)).toFixed(1) + '" r="' + br + '"/>';
  }
  return s + '<circle cx="59" cy="59" r="30" fill="#FFF7E6"/><text x="59" y="70" text-anchor="middle" font-size="30">' + done + '</text></svg>';
}
/* Picture for a line: Gayatri keeps its story pictures; other mantras show their deity scene */
function linePicture(m, li) { const L = m.lines[li]; return L && L.pic ? picture(L.pic) : deityScene(m.deity); }
const hubPicture = m => m.id === 'gayatri' ? picture('sun') : deityScene(m.deity);
let toastTimer = 0;
function toast(html, ms) {
  toastEl.innerHTML = html; toastEl.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { toastEl.hidden = true; }, ms || 2600);
}
function sparkle(x, y, big) {
  const colors = ['#FFC83D', '#FF6F91', '#16B3A3', '#8B6CEF', '#FF8A1F', '#3FA7F5'];
  const n = big ? 12 : 6;
  for (let i = 0; i < n; i++) {
    const el = document.createElement('div');
    el.className = 'spark';
    const a = Math.random() * Math.PI * 2, d = (big ? 70 : 40) + Math.random() * 50;
    el.style.left = x + 'px'; el.style.top = y + 'px';
    el.style.setProperty('--dx', (Math.cos(a) * d).toFixed(0) + 'px'); el.style.setProperty('--dy', (Math.sin(a) * d).toFixed(0) + 'px');
    el.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22"><path d="' + starPath(12, 12.5, 11, 4.8) + '" fill="' + colors[i % colors.length] + '"/></svg>';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 750);
  }
}

/* Reward: always positive, earns a star for this mantra and a sticker */
function earnStar(id) { state.stars[id] = starsOf(id) + 1; state.lastNew = (totalStars() - 1) % STICKERS.length; save(); return state.lastNew; }

/* ------------------------------------------------------------------ */
/* Router (hash based, relative, works under /<repo>/)                 */
/* ------------------------------------------------------------------ */
let pushedFromHome = false, currentRoute = '', lastMantra = 'shiva';
function go(r) {
  if (currentRoute === 'home' || currentRoute === '') { pushedFromHome = true; location.hash = '#' + r; }
  else location.replace('#' + r);
}
function goHome() {
  if (pushedFromHome && history.length > 1) { pushedFromHome = false; history.back(); }
  else location.replace('#home');
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-nav]'); if (!b) return;
  if (b.dataset.nav === 'home') goHome(); else go(b.dataset.nav);
});
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
function route() {
  Player.stop(); keepAwake(false); closeOverlay(); stopRecording(true); stopStages();
  toastEl.hidden = true;
  const r = (location.hash || '#home').slice(1) || 'home';
  if (r === 'home') pushedFromHome = false;
  currentRoute = r.split('/')[0];
  window.scrollTo(0, 0);
  const mm = r.match(/^m\/([a-z]+)(?:\/(listen|learn))?(?:\/(\d+))?$/);
  if (r === 'home') renderHome();
  else if (mm && MBY[mm[1]]) {
    const m = MBY[mm[1]], sub = mm[2], n = mm[3] ? +mm[3] : 0;
    lastMantra = m.id;
    if (!sub) renderHub(m);
    else if (sub === 'listen') renderListen(m);
    else if (sub === 'learn' && n >= 1 && n <= m.lines.length) renderLearnLine(m, n - 1);
    else if (sub === 'learn' && !mm[3]) {
      if (m.lines.length === 1) location.replace('#m/' + m.id + '/learn/1');
      else if (m.kind === 'chalisa') renderJourney(m);
      else renderLearnList(m);
    } else location.replace('#m/' + m.id);
  }
  else if (r === 'stars') renderStars();
  else if (r === 'parent') renderParent();
  else if (/^m\/[a-z]+\/clap/.test(r)) location.replace('#' + r.split('/').slice(0, 2).join('/'));
  else location.replace('#home');
}
window.addEventListener('hashchange', route);

/* ------------------------------------------------------------------ */
/* Home: the mantra library                                            */
/* ------------------------------------------------------------------ */
const starChip = n => '<span class="star-chip" aria-label="' + n + ' stars">' + ICON.star + '<b>' + n + '</b></span>';
function renderHome() {
  const card = m => {
    const n = starsOf(m.id), big = m.kind === 'chalisa';
    const style = 'background:linear-gradient(165deg,' + m.theme[0] + ',' + m.theme[1] + ')';
    const prog = big ? '<span class="jprog"><span class="jbar"><span style="width:' + (practisedCount(m.id) / m.lines.length * 100).toFixed(1) + '%"></span></span><span class="jtxt">' + practisedCount(m.id) + ' / ' + m.lines.length + '</span></span>' : '';
    return '<button class="mcard' + (big ? ' wide' : '') + '" data-nav="m/' + m.id + '" style="' + style + '" aria-label="' + esc(m.name) + ', ' + n + ' stars' + (m.older ? ', for older kids' : '') + '">' +
      '<span class="mpic">' + deityScene(m.deity, { card: true }) + (flowersOf(m.id) ? '<span class="mini-pile" aria-hidden="true">' + pileHTML(m, 5) + '</span>' : '') + '</span>' +
      '<span class="minfo"><span class="mname">' + esc(m.name) + '</span>' + prog +
      '<span class="mmeta">' + starChip(n) + (flowersOf(m.id) ? '<span class="flower-chip" aria-label="' + flowersOf(m.id) + ' flowers offered">' + FLOWER_ICON + '<b>' + flowersOf(m.id) + '</b></span>' : '') + (m.older ? '<span class="tag">Older kids</span>' : '') + '</span></span></button>';
  };
  app.innerHTML = '<section class="screen home lib">' +
    '<div class="home-top"><button class="stars-btn" data-nav="stars" aria-label="My stars, ' + totalStars() + ' stars">' + ICON.star + '<b>' + totalStars() + '</b></button>' +
    '<div class="app-title"><div class="om" lang="sa">ॐ</div><h1>Little Mantras</h1></div>' +
    '<button class="gear" data-nav="parent" aria-label="Grown-ups area">' + ICON.gear + '</button></div>' +
    '<div class="mgrid">' + MANTRAS.map(card).join('') + '</div></section>';
  wireHomeCards();
}

/* Mantra hub: deity picture + the four games */
function renderHub(m) {
  const n = starsOf(m.id), ch = m.kind === 'chalisa';
  app.innerHTML = '<section class="screen hub">' + topbar(m.short || shortName(m), 'home', m.deity) +
    deityStage(m, { cls: 'hubpic pop' }) +
    '<div class="hub-title"><h1>' + esc(m.name) + '</h1>' + (m.older ? '<span class="tag">For older kids</span>' : '') + '</div>' +
    '<div class="hub-line" lang="sa">' + (ch ? 'श्री हनुमान चालीसा' : m.lines[0].deva + (m.lines.length > 1 ? ' …' : '')) + '</div>' +
    '<div class="tiles three">' +
      '<button class="tile t-listen" data-nav="m/' + m.id + '/listen" aria-label="Listen">' + TILE_ICON.listen + '<span class="lbl">Listen</span></button>' +
      '<button class="tile t-learn" data-nav="m/' + m.id + '/learn" aria-label="' + (ch ? 'Hanuman\u2019s journey' : 'Learn') + '">' + TILE_ICON.learn + '<span class="lbl">' + (ch ? 'Journey' : 'Learn') + '</span></button>' +
      '<button class="tile t-stars wide" data-nav="stars" aria-label="My stars">' + TILE_ICON.stars + '<span class="lbl">My stars</span>' + (n ? '<span class="badge">' + n + '</span>' : '') + '</button>' +
    '</div></section>';
  wireStage($('.hubpic'));
}
function shortName(m) { return { shiva: 'Om Namah Shivaya', gayatri: 'Gayatri', ganesha: 'Ganesha', lakshmi: 'Lakshmi', saraswati: 'Saraswati', mrityunjaya: 'Mrityunjaya', chalisa: 'Chalisa' }[m.id] || m.name; }

/* ------------------------------------------------------------------ */
/* Listen                                                              */
/* ------------------------------------------------------------------ */
function renderListen(m) {
  if (m.kind === 'chalisa') { renderChalisaListen(m); return; }
  const N = state.repeat, nL = m.lines.length, L0 = m.lines[0];
  app.innerHTML = '<section class="screen listen">' + topbar('Listen', 'm/' + m.id, m.deity) +
    '<div class="pic pop" id="lpic">' + linePicture(m, 0) + '</div>' +
    '<div id="ldots">' + dotsHTML(nL, -1) + '</div>' +
    devaHTML(L0, 'ldeva') +
    '<div id="lchunks">' + chunksHTML(L0) + '</div>' +
    '<div id="lmean">' + meaningHTML(m.overall) + '</div>' +
    '<div class="controls"><div id="lbeads">' + beadsSVG(N, 0) + '</div>' +
    '<button class="play-btn idle" id="lplay" aria-label="Play">' + ICON.play + '</button></div></section>';
  const btn = $('#lplay');
  let playing = false, shownLine = 0;
  const showLine = li => {
    if (li === shownLine) return;
    shownLine = li;
    if (m.lines[li].pic || li === 0) { const p = $('#lpic'); p.classList.remove('pop'); void p.offsetWidth; p.innerHTML = linePicture(m, li); p.classList.add('pop'); }
    $('#ldeva').textContent = m.lines[li].deva;
    $('#lchunks').innerHTML = chunksHTML(m.lines[li]);
    $('#lmean').innerHTML = meaningHTML(nL > 1 ? m.lines[li].meaning : m.overall);
  };
  const setBtn = on => { playing = on; btn.classList.toggle('playing', on); btn.classList.toggle('idle', !on); btn.innerHTML = on ? ICON.stop : ICON.play; btn.setAttribute('aria-label', on ? 'Stop' : 'Play'); };
  btn.onclick = async () => {
    if (playing) { Player.stop(); keepAwake(false); setBtn(false); return; }
    const tok = Player.begin(); setBtn(true); keepAwake(true);
    shownLine = -1; showLine(0);
    for (let r = 0; r < N; r++) {
      $('#lbeads').innerHTML = beadsSVG(N, r);
      const ok = await playFull(m, (li, c) => { if (!alive(tok)) return; showLine(li); $('#ldots').innerHTML = dotsHTML(nL, li); setChunk($('#lchunks'), c); }, tok);
      if (!ok || !alive(tok)) return;
      $('#lbeads').innerHTML = beadsSVG(N, r + 1);
      sfx.soft();
      if (r < N - 1 && !(await sleep(1100, tok))) return;
    }
    keepAwake(false); setBtn(false);
    $('#lmean').innerHTML = meaningHTML(m.overall);
    celebrate({ id: m.id, title: 'Beautiful!', again: () => btn.click(), ok: () => {} });
  };
}

/* Hanuman Chalisa Listen: play all, or start from a chosen verse */
let chalisaFrom = 0;
function renderChalisaListen(m) {
  const n = m.lines.length;
  let cur = Math.min(chalisaFrom, n - 1), playing = false;
  app.innerHTML = '<section class="screen listen chalisa">' + topbar('Listen', 'm/' + m.id, m.deity) +
    '<div class="pic small pop" id="lpic">' + deityScene(m.deity) + '</div>' +
    '<div class="vstep" role="group" aria-label="Choose a verse"><button class="lp" id="vprev" aria-label="Previous verse">' + ICON.back + '</button>' +
      '<div class="vlabel" id="vlabel" aria-live="polite"></div><button class="lp" id="vnext" aria-label="Next verse">' + ICON.back + '</button></div>' +
    '<div id="ldeva"></div><div id="lchunks"></div><div id="lmean"></div>' +
    '<div class="controls"><button class="pill-btn" id="lall" aria-label="Play all from the start">' + ICON.again + '<span>All</span></button>' +
    '<button class="play-btn idle" id="lplay" aria-label="Play from this verse">' + ICON.play + '</button></div></section>';
  const btn = $('#lplay');
  const show = i => {
    cur = i; const L = m.lines[i];
    $('#vlabel').innerHTML = '<b>' + esc(L.label) + '</b><span>' + (i + 1) + ' / ' + n + '</span>';
    $('#ldeva').innerHTML = devaHTML(L);
    $('#lchunks').innerHTML = chunksHTML(L);
    $('#lmean').innerHTML = meaningHTML(L.meaning);
    $('#vprev').disabled = i === 0; $('#vnext').disabled = i === n - 1;
  };
  const setBtn = on => { playing = on; btn.classList.toggle('playing', on); btn.classList.toggle('idle', !on); btn.innerHTML = on ? ICON.stop : ICON.play; btn.setAttribute('aria-label', on ? 'Stop' : 'Play from this verse'); };
  const stop = () => { Player.stop(); keepAwake(false); setBtn(false); };
  const play = async from => {
    const tok = Player.begin(); setBtn(true); keepAwake(true);
    show(from); chalisaFrom = from;
    const ok = await playFull(m, (li, c) => { if (!alive(tok)) return; if (li !== cur) { show(li); chalisaFrom = li; } setChunk($('#lchunks'), c); }, tok, from);
    if (!ok || !alive(tok)) return;
    keepAwake(false); setBtn(false); chalisaFrom = 0;
    celebrate({ id: m.id, big: true, title: 'Jai Hanuman!', again: () => play(0), ok: () => {} });
  };
  $('#vprev').onclick = () => { if (playing) stop(); if (cur > 0) { show(cur - 1); chalisaFrom = cur; } };
  $('#vnext').onclick = () => { if (playing) stop(); if (cur < n - 1) { show(cur + 1); chalisaFrom = cur; } };
  $('#lall').onclick = () => { play(0); };
  btn.onclick = () => { if (playing) stop(); else play(cur); };
  show(cur);
}

/* ------------------------------------------------------------------ */
/* Learn a line                                                        */
/* ------------------------------------------------------------------ */
function renderLearnList(m) {
  app.innerHTML = '<section class="screen learn-list">' + topbar('Learn', 'm/' + m.id, m.deity) + '<div class="cards">' +
    m.lines.map((L, i) => {
      const un = unlocked(m.id, i), pr = isPractised(m.id, i);
      return '<button class="lcard' + (un ? '' : ' locked') + '" data-line="' + i + '" aria-label="Line ' + (i + 1) + (un ? '' : ' (locked)') + '">' +
        '<div class="thumb">' + linePicture(m, i) + '</div><div><div class="num">' + (i + 1) + '</div><div class="rm">' + esc(L.roman) + '</div></div>' +
        '<div class="state">' + (pr ? ICON.star : un ? '' : ICON.lock) + '</div></button>';
    }).join('') + '</div></section>';
  $$('.lcard').forEach(c => { c.onclick = () => {
    const i = +c.dataset.line;
    if (unlocked(m.id, i)) { go('m/' + m.id + '/learn/' + (i + 1)); return; }
    sfx.soft(); c.classList.remove('shake'); void c.offsetWidth; c.classList.add('shake');
    toast(ICON.lock + '<span>Practise line ' + i + ' first</span>');
  }; });
}

/* Hanuman's journey: 43 stepping stones on a winding path */
const J_COLS = [12.5, 37.5, 62.5, 87.5], J_ROW = 122;
function jPos(i) { const r = Math.floor(i / 4), c = i % 4; return { r, x: J_COLS[r % 2 ? 3 - c : c], y: r * J_ROW + 60 }; }
const RAM_FLAG = '<svg viewBox="0 0 80 80" aria-hidden="true"><path d="M16 70 H64 L58 58 H22Z" fill="#FF8A1F"/><path d="M24 58 V40 L40 24 L56 40 V58Z" fill="#FFE3A3" stroke="#E8590C" stroke-width="3"/><path d="M34 58 V46 a6 6 0 0 1 12 0 V58" fill="#E8590C"/><path d="M40 24 V6" stroke="#8A5A2B" stroke-width="3"/><path d="M40 6 L58 11 L40 17Z" fill="#FF6F1A"/></svg>';
function renderJourney(m) {
  const n = m.lines.length, done = practisedCount(m.id);
  let curI = 0; while (curI < n && isPractised(m.id, curI)) curI++;
  const slots = n + 1, rows = Math.ceil(slots / 4), H = rows * J_ROW + 20;
  let pts = []; for (let i = 0; i < slots; i++) { const p = jPos(i); pts.push(p.x * 4 + ',' + p.y); }
  let path = '<svg class="jpath" viewBox="0 0 400 ' + H + '" preserveAspectRatio="none" aria-hidden="true"><polyline points="' + pts.join(' ') + '" fill="none" stroke="#E8B070" stroke-width="22" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke" opacity=".45"/>' +
    '<polyline points="' + pts.join(' ') + '" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>';
  let steps = '';
  for (let i = 0; i < n; i++) {
    const p = jPos(i), un = unlocked(m.id, i), pr = isPractised(m.id, i), isCur = i === curI;
    steps += '<button class="jstep' + (pr ? ' done' : un ? ' open' : ' locked') + (isCur ? ' cur' : '') + '" data-step="' + i + '" style="left:' + p.x + '%;top:' + p.y + 'px" aria-label="' + esc(m.lines[i].label) + (pr ? ', done' : un ? '' : ', locked') + '">' +
      (pr ? ICON.star : '') + '<span class="jn">' + esc(m.lines[i].short) + '</span>' + (isCur ? '<span class="jhero">' + deityBadge('hanuman') + '</span>' : '') + '</button>';
  }
  const fp = jPos(n);
  steps += '<div class="jgoal' + (done === n ? ' won' : '') + '" style="left:' + fp.x + '%;top:' + fp.y + 'px" aria-label="Lord Rama\u2019s temple">' + RAM_FLAG + '</div>';
  app.innerHTML = '<section class="screen journey">' + topbar('Journey', 'm/' + m.id, m.deity) +
    '<div class="jhead"><h1>Hanuman\u2019s journey</h1><div class="jprog big"><span class="jbar"><span style="width:' + (done / n * 100).toFixed(1) + '%"></span></span><span class="jtxt">' + done + ' / ' + n + '</span></div></div>' +
    '<div class="jmap" style="height:' + H + 'px">' + path + steps + '</div></section>';
  $$('.jstep').forEach(b => { b.onclick = () => {
    const i = +b.dataset.step;
    if (unlocked(m.id, i)) { go('m/' + m.id + '/learn/' + (i + 1)); return; }
    sfx.soft(); b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake');
    toast(ICON.lock + '<span>First do step ' + esc(m.lines[i - 1].short) + '</span>');
  }; });
  const c = $('.jstep.cur');
  if (c && curI > 3) { const toCur = () => { if (!c.isConnected) return; const r = c.getBoundingClientRect(); window.scrollTo(0, Math.max(0, window.scrollY + r.top - window.innerHeight / 2 + 40)); }; requestAnimationFrame(toCur); setTimeout(toCur, 250); }
}

function renderLearnLine(m, li) {
  const back = m.lines.length === 1 ? 'm/' + m.id : 'm/' + m.id + '/learn';
  if (!unlocked(m.id, li)) { location.replace('#' + back); return; }
  const L = m.lines[li], ch = m.kind === 'chalisa';
  const title = ch ? L.label : m.lines.length === 1 ? 'Learn' : 'Line ' + (li + 1);
  app.innerHTML = '<section class="screen learn-line' + (ch ? ' chalisa' : '') + '">' + topbar(title, back, m.deity) +
    '<div class="pic pop' + (ch ? ' small' : '') + '">' + linePicture(m, li) + '</div>' +
    devaHTML(L) +
    '<div id="chk">' + chunksHTML(L) + '</div>' + meaningHTML(L.meaning) +
    '<div class="phase" id="phase"></div></section>';
  const ph = $('#phase');
  const listenPhase = async () => {
    const tok = Player.begin();
    ph.className = 'phase ph-listen';
    ph.innerHTML = '<div class="plabel">Listen</div><div class="big-ic">' + ICON.ear + '</div>';
    const ok = await playLine(m, li, c => setChunk($('#chk'), c), tok);
    if (!ok || !alive(tok)) return;
    if (await sleep(500, tok)) turnPhase(tok);
  };
  const turnPhase = async tok => {
    ph.className = 'phase ph-turn';
    ph.innerHTML = '<div class="plabel">Your turn!</div><div class="row"><button class="pill-btn" id="hear" aria-label="Hear it again">' + ICON.ear + '</button>' +
      '<div class="big-ic"><span class="ring"></span><span class="ring r2"></span><span class="ring r3"></span>' + ICON.mic + '</div>' +
      '<button class="pill-btn go" id="done" aria-label="Done">' + ICON.check + '</button></div>';
    setChunk($('#chk'), -1, 'echo');
    let finished = false;
    const finish = () => {
      if (finished) return; finished = true; Player.stop();
      practisedOf(m.id)[li] = true; save();
      const hasNext = li < m.lines.length - 1, big = ch && practisedCount(m.id) === m.lines.length;
      celebrate({ id: m.id, big, title: big ? 'Jai Hanuman! All 43 done!' : ch ? 'Jai Hanuman!' : 'Super!', again: () => listenPhase(), next: hasNext ? () => go('m/' + m.id + '/learn/' + (li + 2)) : null, ok: () => go(back) });
    };
    $('#hear').onclick = () => { finished = true; listenPhase(); };
    $('#done').onclick = finish;
    /* gentle guide: syllables/words light up slowly while the child repeats; no scoring, no failure */
    if (!(await sleep(900, tok))) return;
    const step = L.unit === 'word' ? 1100 : 950;
    for (let i = 0; i < L.chunks.length; i++) {
      if (!alive(tok) || finished) return;
      setChunk($('#chk'), i, 'echo');
      if (!(await sleep(step, tok))) return;
    }
    setChunk($('#chk'), L.chunks.length, 'echo');
    if (!(await sleep(1400, tok))) return;
    if (!finished) finish();
  };
  listenPhase();
}

/* ------------------------------------------------------------------ */
/* My stars                                                            */
/* ------------------------------------------------------------------ */
function renderStars() {
  const tot = totalStars(), earned = Math.min(tot, STICKERS.length);
  app.innerHTML = '<section class="screen stars">' + topbar('My stars') +
    '<div class="star-total" aria-label="' + tot + ' stars">' + ICON.star + '<span>' + tot + '</span></div>' +
    '<div class="mstars">' + MANTRAS.map(m => '<button class="mstar" data-nav="m/' + m.id + '" aria-label="' + esc(m.name) + ', ' + starsOf(m.id) + ' stars"><span class="deity-badge">' + deityBadge(m.deity) + '</span><b>' + starsOf(m.id) + '</b></button>').join('') + '</div>' +
    '<div class="stickers">' + STICKERS.map((_, i) => '<div class="stk' + (i < earned ? '' : ' locked') + (i === state.lastNew && i < earned ? ' new' : '') + '">' + stickerSVG(i) + '</div>').join('') + '</div></section>';
  if (state.lastNew >= 0) { state.lastNew = -1; save(); }
}

/* ------------------------------------------------------------------ */
/* Interactive deity stage: idle life, tap reactions, particles,       */
/* "tap me" hint, a small blessing after several taps, and the         */
/* "Offer a flower" moment after finishing a mantra.                   */
/* ------------------------------------------------------------------ */
const RM = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
const calm = () => !!RM.matches;
const DEITY_PITCH = { shiva: 523.3, rudra: 440, surya: 659.3, ganesha: 587.3, lakshmi: 698.5, saraswati: 784, hanuman: 622.3 };
const GREETING = { shiva: 'Om Namah Shivaya!', rudra: 'Har Har Mahadev!', surya: 'Jai Surya Dev!', ganesha: 'Jai Shri Ganesha!', lakshmi: 'Jai Lakshmi Maa!', saraswati: 'Jai Saraswati Maa!', hanuman: 'Jai Hanuman!' };
const fxLog = [];
const TAP_HAND = '<span class="tapme" aria-hidden="true"><span class="tring"></span><svg viewBox="0 0 48 48"><path d="M18 26 V9 a3.5 3.5 0 0 1 7 0 V22 l1-8.5 a3.3 3.3 0 0 1 6.5 1 L32 23 l1.4-6 a3.2 3.2 0 0 1 6.2 1.6 L38 30 q-2 12 -12 14 q-9 1 -13 -7 L8 28 a3.3 3.3 0 0 1 5.5-3.5Z" fill="#FFFFFF" stroke="#E8590C" stroke-width="2.5" stroke-linejoin="round"/></svg></span>';

/* particle art */
const PETAL_COL = { shiva: ['#FFFFFF', '#E8F5E9', '#A5D6A7'], rudra: ['#FFFFFF', '#E8F5E9', '#A5D6A7'], surya: ['#E53935', '#FF8A1F', '#FFC83D'], ganesha: ['#FF9F1C', '#E53935', '#FFC83D'],
  lakshmi: ['#FF8FAB', '#FF6F91', '#FFD24A'], saraswati: ['#FFFFFF', '#FFF59D', '#E3F2FD'], hanuman: ['#FF9F1C', '#E53935', '#FFC83D'] };
const PSVG = {
  petal: c => '<svg viewBox="0 0 20 20"><path d="M10 1 C17 6 16 15 10 19 C4 15 3 6 10 1Z" fill="' + c + '" stroke="rgba(0,0,0,.12)" stroke-width="1"/></svg>',
  star: c => '<svg viewBox="0 0 24 24"><path d="' + starPath(12, 12.5, 11, 4.8) + '" fill="' + (c || '#FFD24A') + '"/></svg>',
  coin: () => '<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="8.5" fill="#FFD24A" stroke="#D08A00" stroke-width="1.5"/><circle cx="10" cy="10" r="4.5" fill="none" stroke="#E0A800" stroke-width="1.2"/></svg>',
  note: c => '<svg viewBox="0 0 20 24"><path d="M7 19 V4 L17 1 V15" fill="none" stroke="' + (c || '#6B8FD9') + '" stroke-width="2.4"/><ellipse cx="5" cy="19" rx="4" ry="3.2" fill="' + (c || '#6B8FD9') + '"/><ellipse cx="15" cy="16" rx="4" ry="3.2" fill="' + (c || '#6B8FD9') + '"/></svg>',
  drop: () => '<svg viewBox="0 0 16 22"><path d="M8 1 C12 8 15 12 15 15 A7 7 0 0 1 1 15 C1 12 4 8 8 1Z" fill="#7FCBFF" stroke="#3FA7F5" stroke-width="1.2"/><circle cx="5.5" cy="14" r="1.6" fill="#fff"/></svg>',
  leaf: () => '<svg viewBox="0 0 20 20"><path d="M2 18 C2 8 8 2 18 2 C18 12 12 18 2 18Z" fill="#7BD66B" stroke="#3E8E3E" stroke-width="1.2"/></svg>'
};
/* spawn particles in a stage's fx layer; x,y in % of the stage */
function spawn(stage, kind, n, x, y, opts) {
  if (calm() || !stage) return;
  const layer = stage.querySelector('.fx'); if (!layer) return;
  opts = opts || {};
  const cols = opts.colors || ['#FFD24A'];
  for (let i = 0; i < n; i++) {
    if (layer.childElementCount > 44) break;
    const el = document.createElement('i');
    const mode = opts.mode || 'burst', size = (opts.size || 18) * 1.3 * (0.75 + Math.random() * 0.5);
    el.className = 'pt pt-' + mode;
    let px = x, py = y, dx = 0, dy = 0;
    if (mode === 'fall') { px = 4 + Math.random() * 92; py = -8 - Math.random() * 20; dx = (Math.random() - 0.5) * 30; dy = 120 + Math.random() * 20; }
    else if (mode === 'rise') { px = x + (Math.random() - 0.5) * 10; dx = (Math.random() - 0.5) * 40; dy = -(40 + Math.random() * 30); }
    else { const a = Math.random() * Math.PI * 2, d = 12 + Math.random() * 20; dx = Math.cos(a) * d; dy = Math.sin(a) * d * 0.9 - 4; }
    el.style.cssText = 'left:' + px.toFixed(1) + '%;top:' + py.toFixed(1) + '%;width:' + size.toFixed(0) + 'px;height:' + size.toFixed(0) + 'px;--dx:' + dx.toFixed(1) + 'cqw;--dy:' + dy.toFixed(1) + 'cqh;--r:' + ((Math.random() - 0.5) * 540).toFixed(0) + 'deg;animation-duration:' + ((opts.dur || (mode === 'fall' ? 2.6 : mode === 'rise' ? 1.8 : 1)) * (0.8 + Math.random() * 0.4)).toFixed(2) + 's;animation-delay:' + ((opts.spread || 0) * Math.random()).toFixed(2) + 's';
    const art = PSVG[kind] || PSVG.star;
    el.innerHTML = art(cols[i % cols.length]);
    el.addEventListener('animationend', () => el.remove());
    setTimeout(() => el.remove(), 6000);
    layer.appendChild(el);
  }
}
/* position (in % of stage) of a part, for particles */
function partPos(stage, el) {
  const s = stage.getBoundingClientRect(), r = el.getBoundingClientRect();
  return [((r.left + r.width / 2 - s.left) / s.width * 100), ((r.top + r.height / 2 - s.top) / s.height * 100)];
}
function animate1(el, cls, ms) {
  if (!el) return;
  el.classList.remove(cls); void el.getBoundingClientRect(); el.classList.add(cls);
  clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove(cls), ms || 1300);
}

/* What happens when a part is tapped: animation class, sound, particles */
const REACT = {
  rays: { a: 'r-spin', s: 'chime', p: ['star', 10, 'burst'], glow: 1 },
  lotus: { a: 'r-open', s: 'bell', f: 880, p: ['petal', 7, 'burst', ['#FF9BB5', '#FF6F91']] },
  ganga: { a: 'r-shimmer', s: 'water', p: ['drop', 9, 'fall-local'] },
  moon: { a: 'r-twinkle', s: 'sparkle', p: ['star', 8, 'burst', ['#FFF7CC', '#FFE066']] },
  snake: { a: 'r-nod', s: 'pop', p: ['star', 4, 'burst', ['#7BD66B']] },
  trishul: { a: 'r-shine', s: 'bell', f: 784, p: ['star', 7, 'burst', ['#FFFFFF', '#C9D3DD']] },
  damaru: { a: 'r-shake', s: 'damaru', p: ['note', 4, 'rise', ['#8A5A2B', '#E53935']] },
  hand: { a: 'r-bless', s: 'chime', p: ['star', 9, 'burst', ['#FFE066', '#FFFFFF']], glow: 1 },
  trunk: { a: 'r-wiggle', s: 'toot', p: ['star', 5, 'burst', ['#FFD24A', '#FF9F1C']] },
  mouse: { a: 'r-scurry', s: 'squeak', p: ['star', 4, 'burst', ['#FFFFFF', '#FFB3C7']] },
  modak: { a: 'r-bounce', s: 'pop', p: ['star', 5, 'burst', ['#FFD27A', '#FFFFFF']] },
  ears: { a: 'r-flap', s: 'pop', p: ['star', 4, 'burst'] },
  coins: { a: 'r-jingle', s: 'coin', p: ['coin', 14, 'fall'] },
  veena: { a: 'r-strum', s: 'veena', p: ['note', 6, 'rise', ['#6B8FD9', '#8B6CEF', '#16B3A3']] },
  swan: { a: 'r-glide', s: 'chime', p: ['star', 5, 'burst', ['#FFFFFF', '#BFE6FF']] },
  book: { a: 'r-glowup', s: 'sparkle', p: ['star', 8, 'burst', ['#FFF59D', '#FFFFFF']] },
  mala: { a: 'r-sway', s: 'pluck', f: 587.3, p: ['star', 4, 'burst', ['#FFFFFF']] },
  mountain: { a: 'r-lift', s: 'chime', p: ['leaf', 8, 'burst'] },
  gada: { a: 'r-swing', s: 'bell', f: 987.8, p: ['star', 8, 'burst', ['#FFE066', '#FFFFFF']] },
  tail: { a: 'r-curl', s: 'pop', p: ['star', 4, 'burst', ['#FFB067']] }
};
const BODY = {
  shiva: { s: 'conch' }, rudra: { s: 'conch' }, surya: { s: 'bell' }, ganesha: { s: 'bell' },
  lakshmi: { s: 'bell', also: 'coin' }, saraswati: { s: 'bell', also: 'pluck' }, hanuman: { s: 'whoosh', also: 'bell', fly: 1 }
};
const IDLE_PARTS = { shiva: ['ganga', 'moon', 'snake'], rudra: ['damaru', 'rays', 'moon', 'ganga'], surya: ['rays', 'lotus'], ganesha: ['mouse', 'trunk', 'ears'],
  lakshmi: ['lotus', 'coins'], saraswati: ['swan', 'veena', 'mala'], hanuman: ['tail', 'mountain'] };

function reactPart(stage, partEl, quiet) {
  const deity = stage.dataset.deity, name = partEl.dataset.part, R = REACT[name]; if (!R) return;
  if (!calm()) animate1(partEl, R.a, name === 'mouse' ? 1700 : 1300);
  if (!quiet) {
    TS.play(R.s, R.f);
    const [x, y] = partPos(stage, partEl), p = R.p;
    if (p[2] === 'fall-local') spawn(stage, p[0], p[1], x, y, { mode: 'rise', colors: p[3] });
    else spawn(stage, p[0], p[1], x, y, { mode: p[2], colors: p[3] || ['#FFD24A', '#FFFFFF', '#FF9F1C'], spread: p[2] === 'fall' ? 0.6 : 0 });
    if (R.glow) animate1(stage, 'bright', 1400);
  }
  fxLog.push(deity + ':' + name + (quiet ? ':idle' : ''));
}
function reactBody(stage, x, y) {
  const deity = stage.dataset.deity, B = BODY[deity] || { s: 'bell' };
  TS.play(B.s, DEITY_PITCH[deity]);
  if (B.also) setTimeout(() => TS.play(B.also, DEITY_PITCH[deity] * 1.5), 260);
  if (!calm()) animate1(stage.querySelector('.god'), B.fly ? 'r-fly' : 'r-hop', B.fly ? 1500 : 800);
  animate1(stage, 'bright', 1200);
  spawn(stage, 'petal', 10, x, y, { mode: 'burst', colors: PETAL_COL[deity] });
  spawn(stage, 'star', 4, x, y, { mode: 'burst' });
  fxLog.push(deity + ':body');
}
function blessing(stage) {
  const deity = stage.dataset.deity;
  TS.play('chime'); setTimeout(() => TS.play('bell', DEITY_PITCH[deity]), 300);
  animate1(stage, 'blessed', 2600);
  spawn(stage, 'petal', 26, 50, 0, { mode: 'fall', colors: PETAL_COL[deity], spread: 1.2, size: 20 });
  const b = stage.querySelector('.bubble');
  if (b) { b.textContent = GREETING[deity] || 'Jai!'; animate1(b, 'show', 2600); }
  fxLog.push(deity + ':blessing');
}

/* Stage markup: background + glow + deity (separate layers so idle motion is GPU-composited) */
function deityStage(m, opts) {
  opts = opts || {};
  const key = m.deity, u = uid(), c = SCENE_BG[key] || SCENE_BG.surya, d = DEITIES[key], n = flowersOf(m.id);
  return '<div class="pic stage' + (opts.cls ? ' ' + opts.cls : '') + '" data-deity="' + key + '" data-mid="' + m.id + '">' +
    '<svg class="bg" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="' + u + 'bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + c[0] + '"/><stop offset=".6" stop-color="' + c[1] + '"/><stop offset="1" stop-color="' + c[2] + '"/></linearGradient></defs>' +
      '<rect width="300" height="200" fill="url(#' + u + 'bg)"/>' + sceneDecor(key, u) + '</svg>' +
    '<div class="glow"></div>' +
    '<div class="godwrap"><svg class="god" viewBox="-50 0 300 200" preserveAspectRatio="xMidYMid slice" role="img" aria-label="' + esc(d.name) + (opts.offer ? '' : ', tap to play') + '">' + d.draw(uid()) + '</svg></div>' +
    '<div class="pile" aria-hidden="true">' + pileHTML(m) + '</div>' +
    '<div class="fx" aria-hidden="true"></div>' +
    '<div class="bubble" aria-live="polite"></div>' +
    (opts.offer ? '' : (n ? '<span class="fcount" aria-label="' + n + (n === 1 ? ' flower' : ' flowers') + ' offered">' + FLOWER_ICON + '<b>' + n + '</b></span>' : '') +
      TAP_HAND) +
    '</div>';
}

/* Live behaviour for the stages on screen */
let stageTimers = [];
/* small or thin parts (moon, Ganga, trunk, gada...) get a forgiving hit area: their box plus a margin */
const FAT_PARTS = { ears: 0, rays: 0, veena: 0 };
function nearPart(god, cx, cy) {
  let best = null, bestA = 1e9;
  god.querySelectorAll('[data-part]').forEach(el => {
    if (FAT_PARTS[el.dataset.part] === 0) return;
    const r = el.getBoundingClientRect(), pad = 10;
    if (cx < r.left - pad || cx > r.right + pad || cy < r.top - pad || cy > r.bottom + pad) return;
    const a = r.width * r.height; if (a < bestA) { bestA = a; best = el; }
  });
  return best;
}
function stopStages() { stageTimers.forEach(t => clearInterval(t)); stageTimers = []; }
function wireStage(stage, opts) {
  opts = opts || {};
  if (!stage) return;
  const deity = stage.dataset.deity, god = stage.querySelector('.god');
  let taps = 0, lastTap = performance.now(), ticks = 0;
  const hint = stage.querySelector('.tapme');
  const onTap = e => {
    if (opts.noTap) return;
    audioCtx();
    lastTap = performance.now(); if (hint) hint.classList.remove('on');
    const s = stage.getBoundingClientRect();
    const x = (e.clientX - s.left) / s.width * 100, y = (e.clientY - s.top) / s.height * 100;
    let p = e.target.closest && e.target.closest('[data-part]');
    if (!p || !stage.contains(p)) p = nearPart(god, e.clientX, e.clientY);
    if (p) reactPart(stage, p); else reactBody(stage, x, y);
    taps++;
    if (taps % 6 === 0) setTimeout(() => blessing(stage), 450);
  };
  stage.addEventListener('pointerdown', onTap);
  /* idle: blink, small gestures, and a "tap me" hint when nobody has tapped for a while */
  const iv = setInterval(() => {
    if (!stage.isConnected) { clearInterval(iv); return; }
    if (document.hidden) return;
    ticks++;
    if (!calm() && Math.random() < 0.6) animate1(god, 'blink', 300);
    if (!calm() && ticks % 3 === 0) {
      const parts = IDLE_PARTS[deity] || [], name = parts[Math.floor(Math.random() * parts.length)];
      const el = name && god.querySelector('[data-part="' + name + '"]');
      if (el) reactPart(stage, el, true);
    }
    if (hint && !opts.noTap) { const idle = performance.now() - lastTap; hint.classList.toggle('on', idle > (taps ? 14000 : 3500)); }
  }, 1800);
  stageTimers.push(iv);
}
/* Home cards: subtle life (a gentle hello and blink now and then), soft bell on press */
function wireHomeCards() {
  const cards = $$('.mcard');
  cards.forEach(c => c.addEventListener('pointerdown', e => { audioCtx(); const d = MBY[c.dataset.nav.split('/')[1]].deity; TS.play('bell', DEITY_PITCH[d]); if (!calm()) sparkle(e.clientX, e.clientY, false); }));
  if (calm()) return;
  let k = 0;
  const iv = setInterval(() => {
    if (!cards[0] || !cards[0].isConnected) { clearInterval(iv); return; }
    if (document.hidden) return;
    const c = cards[(k++ * 3 + Math.floor(Math.random() * 2)) % cards.length].querySelector('.mpic');
    animate1(c, 'hello', 1300);
  }, 2600);
  stageTimers.push(iv);
}

/* ------------------------------------------------------------------ */
/* Offer a flower: after finishing a mantra / verse                    */
/* ------------------------------------------------------------------ */
function closeOverlay() { stopOfferTimers(); overlay.hidden = true; overlay.innerHTML = ''; overlay.onclick = null; overlay.className = ''; }
let offerTimers = [];
function stopOfferTimers() { offerTimers.forEach(t => { clearTimeout(t); clearInterval(t); }); offerTimers = []; }
function celebrate(opts) {
  const m = MBY[opts.id], types = DEITY_FLOWERS[m.deity];
  stopOfferTimers();
  overlay.className = 'offering' + (opts.big ? ' big' : '');
  overlay.innerHTML = '<div class="offer"><div class="offer-title">' + FLOWER_ICON + '<span>' + (opts.big ? 'Offer a flower to ' + esc(m.deityName) : 'Offer a flower') + '</span></div>' +
    deityStage(m, { offer: true, cls: 'offer-stage' }) +
    '<div class="basket" id="basket">' + basketSVG('back') + '<div class="bflowers">' +
      types.map((t, i) => '<button class="bfl" data-type="' + t + '" style="--i:' + i + '" aria-label="Offer a ' + FLOWER_NAME[t] + '">' + flowerSVG(t) + '</button>').join('') +
    '</div>' + basketSVG('front') + TAP_HAND.replace('class="tapme"', 'class="tapme on"') + '</div></div>';
  overlay.hidden = false;
  const stage = $('.offer-stage', overlay);
  wireStage(stage, { noTap: true });
  sfx.soft();
  let done = false, drag = null;
  const target = () => { const r = stage.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height * 0.88]; };
  const land = (btn, fromRect) => {
    if (done) return; done = true;
    const t = btn.dataset.type;
    $$('.bfl', overlay).forEach(b => { b.disabled = true; });
    const hint = $('#basket .tapme', overlay); if (hint) hint.remove();
    const finish = () => {
      state.flowers[m.id] = flowersOf(m.id) + 1;
      const sticker = earnStar(m.id);
      const pile = $('.pile', stage);
      const pf = document.createElement('span'); pf.className = 'pf new';
      pf.style.cssText = 'left:50%;bottom:6%;transform:translate(-50%,0)'; pf.innerHTML = flowerSVG(t); pile.appendChild(pf);
      animate1(stage, 'blessed', 3000);
      TS.play('bell', DEITY_PITCH[m.deity]); offerTimers.push(setTimeout(() => TS.play('chime'), 350));
      spawn(stage, 'petal', opts.big ? 30 : 18, 50, 0, { mode: 'fall', colors: PETAL_COL[m.deity], spread: opts.big ? 1.6 : 0.8, size: 20 });
      if (opts.big) { offerTimers.push(setTimeout(() => { TS.play('conch'); spawn(stage, 'petal', 24, 50, 0, { mode: 'fall', colors: PETAL_COL[m.deity], spread: 1.2, size: 22 }); spawn(stage, 'star', 10, 50, 40, { mode: 'burst' }); }, 900)); }
      const b = $('.bubble', stage); b.textContent = GREETING[m.deity]; animate1(b, 'show', 3200);
      fxLog.push(m.deity + ':offered:' + t);
      offerTimers.push(setTimeout(() => showReward(sticker), calm() ? 300 : opts.big ? 2300 : 1500));
    };
    if (calm()) { finish(); return; }
    const fl = document.createElement('div'); fl.className = 'flying'; fl.innerHTML = flowerSVG(t);
    const r = fromRect || btn.getBoundingClientRect(), [tx, ty] = target(), sz = r.width;
    fl.style.cssText = 'left:' + (r.left) + 'px;top:' + (r.top) + 'px;width:' + sz + 'px;height:' + sz + 'px';
    document.body.appendChild(fl); btn.classList.add('gone');
    const dx = tx - (r.left + sz / 2), dy = ty - (r.top + sz / 2);
    const an = fl.animate([{ transform: 'translate(0,0) scale(1) rotate(0)' }, { transform: 'translate(' + (dx * 0.5) + 'px,' + (dy * 0.5 - 70) + 'px) scale(.95) rotate(160deg)', offset: 0.55 }, { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(.55) rotate(340deg)' }], { duration: 950, easing: 'ease-in-out', fill: 'forwards' });
    TS.play('whoosh');
    an.onfinish = () => { fl.remove(); finish(); };
    offerTimers.push(setTimeout(() => { if (fl.isConnected) { fl.remove(); finish(); } }, 1600));
  };
  const showReward = sticker => {
    const colors = ['#FFC83D', '#FF6F91', '#16B3A3', '#8B6CEF', '#FF8A1F', '#3FA7F5', '#3DBE55'];
    let conf = '';
    for (let i = 0; i < (opts.big ? 48 : 30); i++) conf += '<span class="confetti" style="left:' + (Math.random() * 97).toFixed(1) + '%;background:' + colors[i % colors.length] + ';animation-duration:' + (2.2 + Math.random() * 2).toFixed(2) + 's;animation-delay:' + (Math.random() * 0.8).toFixed(2) + 's"></span>';
    const btns = [];
    if (opts.again) btns.push('<button class="pill-btn" data-act="again" aria-label="Again">' + ICON.again + '</button>');
    btns.push(opts.next ? '<button class="pill-btn go" data-act="next" aria-label="Next">' + ICON.next + '</button>' : '<button class="pill-btn go" data-act="ok" aria-label="OK">' + ICON.check + '</button>');
    sfx.chime();
    $('#basket', overlay).outerHTML = '<div class="reward">' + conf + '<div class="reward-row"><div class="reward-star">' + ICON.star + '</div><div class="reward-sticker" aria-label="New sticker">' + stickerSVG(sticker) + '</div></div>' +
      '<div class="reward-title">' + esc(opts.title || 'Well done!') + '</div><div class="row">' + btns.join('') + '</div></div>';
    overlay.classList.add('rewarded');
  };
  /* tap or drag a flower from the basket */
  const bf = $('.bflowers', overlay);
  bf.addEventListener('pointerdown', e => {
    const btn = e.target.closest('.bfl'); if (!btn || done) return;
    audioCtx(); e.preventDefault();
    const r = btn.getBoundingClientRect();
    drag = { btn, x0: e.clientX, y0: e.clientY, r, moved: false, id: e.pointerId };
    try { bf.setPointerCapture(e.pointerId); } catch (x) {}
    const hint = $('#basket .tapme', overlay); if (hint) hint.remove();
    TS.play('pop');
  });
  bf.addEventListener('pointermove', e => {
    if (!drag || calm()) return;
    const dx = e.clientX - drag.x0, dy = e.clientY - drag.y0;
    if (!drag.moved && Math.hypot(dx, dy) < 8) return;
    drag.moved = true; drag.btn.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(1.15)'; drag.btn.classList.add('dragging');
  });
  const up = () => {
    if (!drag) return;
    const d = drag; drag = null;
    const r = d.btn.getBoundingClientRect();
    d.btn.style.transform = ''; d.btn.classList.remove('dragging');
    land(d.btn, d.moved ? r : null);
  };
  bf.addEventListener('pointerup', up);
  bf.addEventListener('pointercancel', up);
  bf.addEventListener('click', e => { const btn = e.target.closest('.bfl'); if (btn && e.detail === 0) land(btn); }); /* keyboard */
  overlay.onclick = e => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const act = b.dataset.act; closeOverlay();
    if (act === 'again' && opts.again) opts.again();
    else if (act === 'next' && opts.next) opts.next();
    else if (opts.ok) opts.ok();
  };
}

/* ------------------------------------------------------------------ */
/* Recording (MediaRecorder -> IndexedDB)                              */
/* ------------------------------------------------------------------ */
const canRecord = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder && window.isSecureContext !== false);
let rec = null;
function pickMime() {
  const c = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus', 'audio/aac'];
  try { for (const m of c) if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(m)) return m; } catch (e) {}
  return '';
}
function stopRecording(cancel) {
  if (!rec) return;
  const r = rec;
  r.cancelled = !!cancel;
  clearInterval(r.iv);
  try { if (r.mr.state !== 'inactive') r.mr.stop(); } catch (e) {}
  if (cancel) { try { r.stream.getTracks().forEach(t => t.stop()); } catch (e) {} rec = null; }
}
async function startRecording(key, onChange, onMsg) {
  if (rec) stopRecording(false);
  Player.stop();
  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
  } catch (err) {
    const n = err && err.name;
    onMsg(n === 'NotAllowedError' || n === 'SecurityError'
      ? 'Microphone permission is blocked. Allow the microphone for this app in the browser\u2019s site settings, then try again. Until then the built-in voice is used.'
      : n === 'NotFoundError' || n === 'OverconstrainedError'
        ? 'No microphone was found on this device. The built-in voice will be used instead.'
        : 'The microphone could not be started (' + esc(n || 'error') + '). The built-in voice will be used instead.', true);
    return;
  }
  const mime = pickMime();
  let mr;
  try { mr = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream); }
  catch (e) { stream.getTracks().forEach(t => t.stop()); onMsg('Recording is not supported in this browser. The built-in voice will be used instead.', true); return; }
  const r = { key, mr, stream, chunks: [], t0: performance.now(), cancelled: false, iv: 0 };
  rec = r;
  mr.ondataavailable = e => { if (e.data && e.data.size) r.chunks.push(e.data); };
  mr.onstop = async () => {
    const dur = (performance.now() - r.t0) / 1000;
    try { stream.getTracks().forEach(t => t.stop()); } catch (e) {}
    if (rec === r) rec = null;
    if (r.cancelled || !r.chunks.length) { onChange(); return; }
    try {
      const blob = new Blob(r.chunks, { type: mr.mimeType || mime || 'audio/webm' });
      const data = await blob.arrayBuffer();
      await DB.put(key, { data, type: blob.type, duration: dur, created: Date.now() });
      invalidateRec(key);
      if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
      onMsg('Saved! Your voice is now used for ' + recLabel(key) + '.', false);
    } catch (e) { onMsg('Could not save the recording on this device (storage error).', true); }
    onChange();
  };
  try { mr.start(250); } catch (e) { rec = null; stream.getTracks().forEach(t => t.stop()); onMsg('Recording could not start in this browser.', true); return; }
  r.iv = setInterval(() => {
    const el = document.getElementById('st-' + key); if (el) el.textContent = '\u25CF ' + fmtTime((performance.now() - r.t0) / 1000);
    if (performance.now() - r.t0 > 150000) stopRecording(false);
  }, 250);
  onChange();
}

let deferredInstall = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredInstall = e; const b = $('#install'); if (b) b.hidden = false; });
window.addEventListener('appinstalled', () => { deferredInstall = null; const b = $('#install'); if (b) b.hidden = true; });

/* ------------------------------------------------------------------ */
/* Parent area                                                         */
/* ------------------------------------------------------------------ */
function recLabel(key) {
  const [id, part] = key.split('/'), m = MBY[id];
  if (!m) return key;
  if (part === 'full') return m.name + ' (full, for Listen)';
  const i = +part.slice(4);
  return m.name + (m.kind === 'chalisa' ? ' – ' + m.lines[i].label : m.lines.length > 1 ? ' – line ' + (i + 1) : '');
}
const SOURCES = {
  shiva: 'Panchakshari mantra (five syllables na-ma-shi-vaa-ya) with Om, from the Shri Rudram (Yajur Veda).',
  gayatri: 'Gayatri Mantra (Rig Veda 3.62.10) with the traditional opening \u201cOm Bhur Bhuvah Svah\u201d. Savitur is the Sun, the giver of light and life.',
  ganesha: 'Traditional shloka to Ganesha, said before starting anything new. Vakratunda = \u201cthe one with the curved trunk\u201d.',
  lakshmi: 'Lakshmi beeja mantra. \u201cShreem\u201d is Lakshmi\u2019s seed syllable; it has no word-for-word meaning.',
  saraswati: 'Traditional shloka to Saraswati, often said by children before studying.',
  mrityunjaya: 'Rig Veda 7.59.12 (also in the Yajur Veda), in the usual recitation form with Om. Its theme (freedom from death) is gentle but abstract, so it is marked for older kids; the kid meaning keeps it simple.',
  chalisa: 'Hanuman Chalisa by Goswami Tulsidas (16th century, Awadhi), public domain. 2 opening dohas, 40 chaupais and a closing doha, following the common Gita Press reading. Each verse unlocks after the one before; \u201cUnlock all\u201d opens every verse.'
};
let parentSel = null;
function renderParent() {
  const m = MBY[parentSel || lastMantra] || MANTRAS[0];
  parentSel = m.id;
  const keys = recKeysFor(m), ch = m.kind === 'chalisa';
  app.innerHTML = '<section class="screen parent-screen">' + topbar('Grown-ups') + '<div class="parent">' +
    '<div class="panel"><h2>Choose a mantra</h2><div class="mchips" role="group" aria-label="Mantra">' + MANTRAS.map(x => '<button class="pbtn' + (x.id === m.id ? ' sel' : '') + '" data-msel="' + x.id + '" aria-pressed="' + (x.id === m.id) + '">' + esc(shortName(x)) + '</button>').join('') + '</div></div>' +
    '<div class="panel"><h2>Your voice – ' + esc(m.name) + '</h2>' +
      '<p>' + (ch ? 'Record each verse slowly and clearly (both half-lines).' : m.lines.length > 1 ? 'Record each line slowly and clearly. For the full mantra, pause briefly between lines so the pictures change at the right time.' : 'Record the mantra slowly and clearly.') + '</p>' +
      '<div class="note" id="vnote">A recorded parent voice sounds much better than the built-in computer voice. Once saved, it is used for all playback of this mantra.</div>' +
      (canRecord ? '' : '<div class="note warn" id="nomic" style="margin-top:8px">Recording is not available here (no microphone / MediaRecorder, or the page is not on https). Everything still works with the built-in voice.</div>') +
      '<div class="note" id="recmsg" hidden style="margin-top:8px" role="status"></div>' +
      '<div id="recrows"></div>' +
      '<p class="small" id="vstat">' + esc(voiceStatus()) + '</p></div>' +
    '<div class="panel"><h2>Listen repeats</h2><p>How many times a mantra plays in Listen (bead counter). The Hanuman Chalisa plays once.</p>' +
      '<div class="seg" role="group" aria-label="Repeat count">' + REPEAT_OPTIONS.map(n => '<button class="pbtn' + (state.repeat === n ? ' sel' : '') + '" data-rep="' + n + '" aria-pressed="' + (state.repeat === n) + '">' + n + '</button>').join('') + '</div></div>' +
    '<div class="panel"><h2>Lines &amp; progress</h2><div class="switch-row"><p>Unlock all lines and verses<br><span class="small">Normally each line (and each Chalisa verse) opens after the one before is practised.</span></p><button class="switch" id="unlock" role="switch" aria-checked="' + state.unlockAll + '" aria-label="Unlock all lines"></button></div>' +
      '<ul class="plist">' + MANTRAS.map(x => '<li><span>' + esc(shortName(x)) + '</span><span>' + starsOf(x.id) + ' ★ &middot; ' + flowersOf(x.id) + ' flowers &middot; ' + practisedCount(x.id) + '/' + x.lines.length + '</span></li>').join('') + '</ul>' +
      '<div class="rec-btns"><button class="pbtn danger" id="reset">' + ICON.trash + ' Reset progress</button></div>' +
      '<p class="small">Reset clears stars, stickers, offered flowers and progress for all mantras. Recordings are kept.</p></div>' +
    '<div class="panel"><h2>Meaning to read aloud</h2><p><b>' + esc(m.overall) + '</b></p><ul class="mlist">' +
      m.lines.map(L => '<li>' + (L.label ? '<div class="small"><b>' + esc(L.label) + '</b></div>' : '') + '<div class="d" lang="' + (ch ? 'hi' : 'sa') + '">' + L.deva + (L.deva2 ? '<br>' + L.deva2 : '') + '</div><div><b>' + esc(L.roman) + '</b></div><div>' + esc(L.meaning) + '</div></li>').join('') + '</ul>' +
      '<p class="small">' + esc(SOURCES[m.id] || '') + '</p></div>' +
    '<div class="panel"><h2>App</h2><p>Works fully offline once opened. To install: Chrome menu ⋮ → <b>Install app</b> or <b>Add to Home screen</b>.</p>' +
      '<div class="rec-btns"><button class="pbtn" id="install"' + (deferredInstall ? '' : ' hidden') + '>Install app</button></div>' +
      '<p class="small">No ads, no accounts, no internet needed. Progress and recordings stay on this device only.</p></div>' +
    '</div></section>';

  const msg = (t, warn) => { const x = $('#recmsg'); if (!x) return; x.hidden = false; x.classList.toggle('warn', !!warn); x.innerHTML = t; };
  const rowLabel = (k, i) => { if (k.endsWith('/full')) return ['Full mantra', 'all ' + m.lines.length + ' lines']; const L = m.lines[i]; return [ch ? L.label : m.lines.length > 1 ? 'Line ' + (i + 1) : 'Mantra', L.roman]; };
  const drawRows = async () => {
    const have = {};
    for (const k of keys) { const r = await DB.get(k); have[k] = r ? (r.duration || 0) : null; }
    const box = $('#recrows'); if (!box || parentSel !== m.id) return;
    box.innerHTML = keys.map((k, i) => {
      const live = !!(rec && rec.key === k), h = have[k] != null, lab = rowLabel(k, i), sid = 'st-' + k;
      return '<div class="rec-row"><div class="rec-head"><div><b>' + esc(lab[0]) + '</b> <span class="sub">' + esc(lab[1]) + '</span></div>' +
        '<span class="status' + (live ? ' live' : h ? ' mine' : '') + '" id="' + esc(sid) + '">' + (live ? '\u25CF 0:00' : h ? 'Your voice \u2713 ' + fmtTime(have[k]) : 'Built-in voice') + '</span></div>' +
        '<div class="rec-btns">' +
          '<button class="pbtn rec' + (live ? ' on' : '') + '" data-rec="' + k + '"' + (canRecord ? '' : ' disabled') + ' aria-label="' + (live ? 'Stop recording ' : 'Record ') + esc(lab[0]) + '">' + (live ? ICON.stopS + ' Stop' : ICON.recDot + ' Record') + '</button>' +
          '<button class="pbtn" data-play="' + k + '"' + (live ? ' disabled' : '') + ' aria-label="Play ' + esc(lab[0]) + '">' + ICON.playS + ' Play</button>' +
          '<button class="pbtn danger" data-del="' + k + '"' + (h && !live ? '' : ' disabled') + ' aria-label="Delete ' + esc(lab[0]) + ' recording">' + ICON.trash + ' Delete</button>' +
        '</div></div>';
    }).join('');
  };
  drawRows();
  const root = $('.parent');
  const PLAY_HTML = ICON.playS + ' Play';
  root.addEventListener('click', async e => {
    const b = e.target.closest('button'); if (!b || b.disabled) return;
    if (b.dataset.msel) {
      if (b.dataset.msel === parentSel) return;
      Player.stop(); stopRecording(true); parentSel = b.dataset.msel; renderParent();
      const p = $('.mchips'); if (p) p.scrollIntoView({ block: 'start' });
    } else if (b.dataset.rec) {
      const k = b.dataset.rec;
      if (rec && rec.key === k) { stopRecording(false); return; }
      $('#recmsg').hidden = true;
      await startRecording(k, drawRows, msg);
    } else if (b.dataset.play) {
      const k = b.dataset.play;
      if (b.dataset.on === '1') { Player.stop(); return; }
      const tok = Player.begin();
      $$('[data-play]').forEach(x => { x.dataset.on = ''; x.innerHTML = PLAY_HTML; });
      b.dataset.on = '1'; b.innerHTML = ICON.stopS + ' Stop';
      if (k.endsWith('/full')) await playFull(m, () => {}, tok); else await playLine(m, +k.split('/')[1].slice(4), () => {}, tok);
      if (b.isConnected && (alive(tok) || b.dataset.on === '1')) { b.dataset.on = ''; b.innerHTML = PLAY_HTML; }
    } else if (b.dataset.del) {
      const k = b.dataset.del;
      if (b.dataset.confirm !== '1') { b.dataset.confirm = '1'; b.innerHTML = ICON.trash + ' Sure?'; setTimeout(() => { if (b.isConnected) { b.dataset.confirm = ''; b.innerHTML = ICON.trash + ' Delete'; } }, 3500); return; }
      Player.stop();
      try { await DB.del(k); } catch (x) {}
      invalidateRec(k); msg('Recording deleted. The built-in voice will be used.', false); drawRows();
    } else if (b.dataset.rep) {
      state.repeat = +b.dataset.rep; save();
      $$('[data-rep]').forEach(x => { const on = +x.dataset.rep === state.repeat; x.classList.toggle('sel', on); x.setAttribute('aria-pressed', on); });
    } else if (b.id === 'unlock') {
      state.unlockAll = !state.unlockAll; save(); b.setAttribute('aria-checked', state.unlockAll);
    } else if (b.id === 'reset') {
      if (b.dataset.confirm !== '1') { b.dataset.confirm = '1'; b.innerHTML = ICON.trash + ' Tap again to reset'; setTimeout(() => { if (b.isConnected) { b.dataset.confirm = ''; b.innerHTML = ICON.trash + ' Reset progress'; } }, 3500); return; }
      state = Object.assign(freshState(), { repeat: state.repeat });
      save(); renderParent(); toast(ICON.check.replace(/currentColor/g, '#3DBE55') + '<span>Progress reset</span>');
    } else if (b.id === 'install' && deferredInstall) {
      deferredInstall.prompt(); try { await deferredInstall.userChoice; } catch (x) {} deferredInstall = null; b.hidden = true;
    }
  });
  if ('speechSynthesis' in window) setTimeout(() => { refreshVoices(); const v = $('#vstat'); if (v) v.textContent = voiceStatus(); }, 800);
}

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */
document.addEventListener('visibilitychange', () => { if (document.hidden) stopRecording(false); });
route();
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
  window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js', { scope: './' }).catch(() => {}); });
}
window.__gk = { MANTRAS, MBY, state: () => state, getRec, segmentsFor, canRecord, DB, recKeysFor, fxLog, sounds: TS.log, REACT };
})();
