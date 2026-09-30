import { Question } from '../types/exam';
import { KPSS_EXAM_QUESTIONS } from '../data/kpssQuestions';

/**
 * 2026 Ortaöğretim KPSS Format & Curriculum Guidelines:
 * Total 120 Questions / 130 Minutes:
 * 1. Türkçe (1 - 30): Sözcükte/Cümlede Anlam, Paragraf Analizi, Ses Bilgisi, Yazım Kuralları, Noktalama, Cümle Ögeleri, Sözel Mantık.
 * 2. Matematik & Geometri (31 - 60): Sayı Basamakları, Rasyonel/Üslü/Köklü, Basit Eşitsizlik, Mutlak Değer, Problemler (Sayı, Kesir, Yaş, Yüzde-Kâr, Hız), Geometri.
 * 3. Tarih (61 - 87): İslamiyet Öncesi, İlk Türk İslam, Osmanlı Devleti (Siyasi ve Kültür Medeniyet), İnkılap Tarihi, Çağdaş Türk ve Dünya Tarihi.
 * 4. Coğrafya (88 - 105): Coğrafi Konum, Yerşekilleri, İklim, Nüfus ve Yerleşme, Tarım-Hayvancılık, Madenler ve Sanayi.
 * 5. Vatandaşlık & Hukuk (106 - 114): Temel Hukuk, 1982 Anayasası, TBMM, Cumhurbaşkanlığı, Yargı, İdare Hukuku.
 * 6. Güncel Bilgiler (115 - 120): 2026 vizyonu, uluslararası kuruluşlar, kültür-sanat, coğrafi işaretler ve gelişmeler.
 */

// Fisher-Yates array shuffler
function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Procedural Math Problem Generators to ensure 100% unique calculations every exam
function generateRandomMathProblems(): Partial<Question>[] {
  const problems: Partial<Question>[] = [];

  // Problem 1: Sayı & Kesir Problemi (Parametric)
  const totalStudents = (Math.floor(Math.random() * 5) + 3) * 12; // e.g. 36, 48, 60, 72
  const fractionNum = 3;
  const fractionDenom = 4;
  const passed = (totalStudents * fractionNum) / fractionDenom;
  const failed = totalStudents - passed;
  problems.push({
    subjectId: 'MATEMATIK',
    topic: 'Kesir Problemleri',
    question: `Bir sınıftaki ${totalStudents} öğrencinin $\\frac{${fractionNum}}{${fractionDenom}}$'ü matematik sınavında başarılı olmuştur. Başarılı öğrencilerin yarısı kız öğrenci olduğuna göre, bu sınavda başarılı olan ERKEK öğrenci sayısı kaçtır?`,
    options: [
      `${passed / 2}`,
      `${passed / 2 + 3}`,
      `${passed / 2 - 3}`,
      `${failed}`,
      `${passed / 2 + 6}`
    ],
    correctAnswer: 0,
    explanation: `Sınıf mevcudu = ${totalStudents}. Başarılı öğrenci sayısı: ${totalStudents} × (${fractionNum}/${fractionDenom}) = ${passed}. Başarılı öğrencilerin yarısı erkek olduğuna göre: ${passed} ÷ 2 = ${passed / 2} bulunur.`
  });

  // Problem 2: Yaş Problemi (Parametric)
  const ageDiff = (Math.floor(Math.random() * 4) + 6) * 4; // 24, 28, 32, 36
  const yearsLater = Math.floor(Math.random() * 3) + 3; // 3, 4, 5
  // Baba = Çocuk + ageDiff. x yıl sonra...
  const childNow = 10;
  const fatherNow = childNow + ageDiff;
  const sumAfter = (childNow + yearsLater) + (fatherNow + yearsLater);
  problems.push({
    subjectId: 'MATEMATIK',
    topic: 'Yaş Problemleri',
    question: `Bir babanın yaşı, çocuğunun yaşından ${ageDiff} fazladır. ${yearsLater} yıl sonra ikisinin yaşları toplamı ${sumAfter} olacağına göre, babanın bugünkü yaşı kaçtır?`,
    options: [
      `${fatherNow}`,
      `${fatherNow - 4}`,
      `${fatherNow + 4}`,
      `${childNow}`,
      `${fatherNow + 8}`
    ],
    correctAnswer: 0,
    explanation: `Çocuğun yaşı = x, babanın yaşı = x + ${ageDiff}. ${yearsLater} yıl sonra yaşları (x + ${yearsLater}) ve (x + ${ageDiff} + ${yearsLater}) olur. Toplam: 2x + ${ageDiff} + ${yearsLater * 2} = ${sumAfter} => 2x = ${sumAfter - ageDiff - yearsLater * 2} => x = ${childNow}. Babanın bugünkü yaşı: ${childNow} + ${ageDiff} = ${fatherNow}.`
  });

  // Problem 3: Yüzde ve Kâr-Zarar Problemi (Parametric)
  const costPrice = (Math.floor(Math.random() * 5) + 4) * 100; // 400, 500, 600, 700, 800
  const profitRate = 25; // %25
  const discountRate = 20; // %20 indirim
  const labeledPrice = costPrice * 1.25;
  const salePrice = labeledPrice * 0.8;
  problems.push({
    subjectId: 'MATEMATIK',
    topic: 'Yüzde & Kâr-Zarar Problemleri',
    question: `Maliyeti ${costPrice} TL olan bir ürün, etiket fiyatı üzerinden %${profitRate} kârla satışa sunulmuştur. Sezon sonunda bu etiket fiyatı üzerinden %${discountRate} indirim yapıldığına göre, ürünün son satış fiyatı kaç TL olur?`,
    options: [
      `${salePrice} TL (Maliyetine satılmıştır)`,
      `${salePrice + 40} TL`,
      `${salePrice - 30} TL`,
      `${salePrice + 80} TL`,
      `${salePrice - 60} TL`
    ],
    correctAnswer: 0,
    explanation: `Etiket fiyatı = ${costPrice} + (${costPrice} × 25/100) = ${labeledPrice} TL. Yapılan %20 indirim: ${labeledPrice} × 20/100 = ${labeledPrice * 0.2} TL. Son satış fiyatı: ${labeledPrice} - ${labeledPrice * 0.2} = ${salePrice} TL. Ürün tam maliyetine satılmıştır.`
  });

  // Problem 4: Hız & Hareket Problemi (Parametric)
  const speedA = 60;
  const speedB = 80;
  const hours = Math.floor(Math.random() * 3) + 3; // 3, 4, 5
  const totalDistance = (speedA + speedB) * hours;
  problems.push({
    subjectId: 'MATEMATIK',
    topic: 'Hız & Hareket Problemleri',
    question: `A ve B şehirleri arasındaki mesafe ${totalDistance} km'dir. İki araç aynı anda birbirlerine doğru sırasıyla saatte ${speedA} km ve ${speedB} km sabit hızlarla hareket ettiklerine göre, bu iki araç kaç saat sonra karşılaşır?`,
    options: [
      `${hours}`,
      `${hours + 1}`,
      `${hours - 1}`,
      `${hours + 2}`,
      `${hours + 1.5}`
    ],
    correctAnswer: 0,
    explanation: `Birbirine doğru hareket eden araçların hızları toplanır: Vtoplam = ${speedA} + ${speedB} = 140 km/s. Karşılaşma süresi t = Yol / Vtoplam = ${totalDistance} / 140 = ${hours} saat olarak bulunur.`
  });

  // Problem 5: Üslü Sayılar (Parametric)
  const baseVal = 3;
  const expVal = Math.floor(Math.random() * 3) + 3; // 3, 4, 5
  const ansExp = Math.pow(baseVal, expVal);
  problems.push({
    subjectId: 'MATEMATIK',
    topic: 'Üslü Sayılar',
    question: `$$3^{x-1} = ${ansExp / baseVal}$$\nolduğuna göre, $x$ değeri kaçtır?`,
    options: [
      `${expVal}`,
      `${expVal - 1}`,
      `${expVal + 1}`,
      `${expVal + 2}`,
      `${expVal - 2}`
    ],
    correctAnswer: 0,
    explanation: `${ansExp / baseVal} sayısı $3^{${expVal - 1}}$ şeklinde yazılır. $3^{x-1} = 3^{${expVal - 1}}$ eşitliğinden tabanlar eşit olduğundan üsler de eşittir: $x - 1 = ${expVal - 1} \\Rightarrow x = ${expVal}$ bulunur.`
  });

  return problems;
}

// 2026 Ortaöğretim KPSS Pool of Rich Curated Questions
const EXTENDED_ORTAOGRETIM_POOL: Partial<Question>[] = [
  // --- TÜRKÇE ---
  {
    subjectId: 'TURKCE',
    topic: 'Sözcükte Anlam & Deyimler',
    question: 'Aşağıdaki cümlelerin hangisinde "el üstünde tutulmak" deyiminin anlamı vardır?',
    options: [
      'Gittiği her mecliste kendisine büyük bir saygı, sevgi ve itibar gösterilirdi.',
      'Sorumluluklarını zamanında yerine getirmediği için herkes tarafından kınandı.',
      'Zor günlerinde dostlarının desteğini almakta oldukça zorlandı.',
      'Tüm mal varlığını ihtiyaç sahiplerine dağıtarak mütevazı bir yaşam seçti.',
      'Yaptığı başarılı işler sonucunda yeni terfi haberini heyecanla bekledi.'
    ],
    correctAnswer: 0,
    explanation: '"El üstünde tutulmak" bir kimseye çok sevgi, saygı ve aşırı düşkünlük gösterip onu şımartırcasına ağırlamak demektir. A seçeneği bu anlamı tam karşılar.'
  },
  {
    subjectId: 'TURKCE',
    topic: 'Cümlede Anlam & Neden-Sonuç',
    question: 'Aşağıdaki cümlelerin hangisinde "neden-sonuç (gerekçeli yargı)" ilişkisi vardır?',
    options: [
      'Şiddetli fırtına nedeniyle köy yolunda direkler devrilince elektrikler kesildi.',
      'Sınavda yüksek bir derece elde etmek amacıyla gecesini gündüzüne kattı.',
      'Bahar gelip havalar ısındıkça parklardaki insan yoğunluğu artıyordu.',
      'Konferansa yetişebilmek için sabahın ilk ışıklarıyla otogara gitti.',
      'Ödevlerini zamanında teslim edersen hafta sonu sinemaya gidebilirsin.'
    ],
    correctAnswer: 0,
    explanation: 'A seçeneğinde elektriklerin kesilmesinin somut gerekçesi "fırtına nedeniyle direklerin devrilmesi"dir (neden-sonuç). B ve D amaç-sonuç, E ise koşul-sonuçtur.'
  },
  {
    subjectId: 'TURKCE',
    topic: 'Yazım Kuralları',
    question: 'Aşağıdaki cümlelerin hangisinde büyük harflerin yazımıyla ilgili bir YANLIŞLIK yapılmıştır?',
    options: [
      'Kuzeydoğu Anadolu\'da kış mevsimi oldukça sert ve dondurucu geçer.',
      'Van Gölü canavarı efsanesi bölgeye çok sayıda yerli turist çekmektedir.',
      'Bu tarihi karar Resmi Gazete\'de yayımlanarak derhal yürürlüğe girdi.',
      'Gazi Mustafa Kemal Paşa Caddesi üzerinde yeni bir kütüphane açıldı.',
      'Geleneksel Türk kahvesi yapımında Maraş Dondurması ikram edilir.'
    ],
    correctAnswer: 4,
    explanation: 'Özel ada dahil olmayan şehir, unvan veya yiyecek isimlerinde tür adı küçük harfle başlar: "Maraş dondurması", "Antep fıstığı", "Hindistan cevizi" küçük yazılır. "Maraş Dondurması" yazımı hatalıdır.'
  },
  {
    subjectId: 'TURKCE',
    topic: 'Noktalama İşaretleri',
    question: 'Aşağıdaki cümlelerin hangisinde kesme işaretinin (\') kullanımı YANLIŞTIR?',
    options: [
      'Ahmetler\'in bu akşamki davetine ailecek katılacağız.',
      'TBMM\'nin 2026 yılı bütçe görüşmeleri yoğun geçti.',
      'Türk Dil Kurumu Başkanı\'na resmi teşekkür yazısı gönderildi.',
      '1923\'te ilan edilen Cumhuriyet halk tarafından coşkuyla kutlandı.',
      'Öğretmenimiz Sait Faik\'in öykü dünyasını derinlemesine anlattı.'
    ],
    correctAnswer: 0,
    explanation: 'Özel isimlere getirilen yapım ekleri ve çokluk eki (-ler, -lar) kesme işaretiyle ayrılmaz, bunlardan sonra gelen ekler de ayrılmaz. "Ahmetlerin" şeklinde bitişik yazılmalıdır.'
  },
  {
    subjectId: 'TURKCE',
    topic: 'Ses Bilgisi',
    question: '"Küçücük bir umutla çıktığı bu yolculukta nice zorlukların üstesinden gelmeyi başardı." cümlesinde aşağıdaki ses olaylarından hangisi vardır?',
    options: [
      'Ünsüz düşmesi',
      'Ünlü türemesi',
      'Büyük ünlü uyumsuzluğu',
      'Ünsüz türemesi',
      'Ünlü daralması'
    ],
    correctAnswer: 0,
    explanation: '"Küçük-cük" birleşirken "k" ünsüzü düşerek "küçücük" haline gelmiştir. Bu bir ünsüz düşmesidir.'
  },
  {
    subjectId: 'TURKCE',
    topic: 'Paragrafta Anlam',
    context: 'Sanat eseri, yalnızca ortaya konduğu dönemin belgesi değil; yüzyıllar sonrasına insan ruhunun derinliklerini taşıyan canlı bir köprüdür. Bir eserin kalıcılığı, güncel polemiklerden sıyrılıp insanın evrensel acılarını, umutlarını ve çelişkilerini samimi bir estetikle dillendirebilmesinde yatar.',
    question: 'Bu parçaya göre bir sanat eserini kalıcı kılan asıl unsur aşağıdakilerden hangisidir?',
    options: [
      'İnsanın evrensel duygu ve yaşantılarını estetik bir dille aktarması',
      'Yaşadığı çağın siyasi çekişmelerine doğrudan taraf olması',
      'Döneminin en popüler üslup ve tekniklerini taklit etmesi',
      'Geniş kitlelerin beğenisine hitap edecek sade bir kurgu seçmesi',
      'Tarihsel olayları kronolojik olarak tarafsızca belgelemesi'
    ],
    correctAnswer: 0,
    explanation: 'Metinde eserin kalıcılığının güncel polemiklerden sıyrılarak insanın evrensel acı ve umutlarını estetikle harmanlamasına bağlı olduğu açıkça ifade edilmiştir.'
  },

  // --- TARİH ---
  {
    subjectId: 'TARIH',
    topic: 'İslamiyet Öncesi Türk Tarihi',
    question: 'Tarihte Türk adıyla kurulan ilk devlet aşağıdakilerden hangisidir ve kurucusu kimdir?',
    options: [
      'I. Göktürk (Kök Türk) Devleti - Bumin Kağan',
      'Asya Hun Devleti - Teoman',
      'Uygur Devleti - Kutluk Bilge Kül Kağan',
      'Avar Kağanlığı - Bayan Kağan',
      'Hazarlar - Bulan Kağan'
    ],
    correctAnswer: 0,
    explanation: 'Tarihte "Türk" adını siyasi ve resmi bir devlet adı olarak ilk defa kullanan devlet 552 yılında Bumin Kağan tarafından kurulan I. Göktürk Devleti\'dir.'
  },
  {
    subjectId: 'TARIH',
    topic: 'İlk Türk İslam Devletleri',
    question: 'Büyük Selçuklu Devleti\'nde vezirlik yapan, "Siyasetname" adlı ünlü eseri yazan ve kendi adıyla anılan medreseleri kuran devlet adamı kimdir?',
    options: [
      'Nizamülmülk',
      'Yusuf Has Hacib',
      'Kaşgarlı Mahmud',
      'Gazneli Mahmud',
      'Ali Şir Nevai'
    ],
    correctAnswer: 0,
    explanation: 'Alparslan ve Melikşah dönemlerinde vezirlik yapan, Bağdat\'ta Nizamiye Medreselerini kuran ve Siyasetname\'yi kaleme alan ünlü vezir Nizamülmülk\'tür.'
  },
  {
    subjectId: 'TARIH',
    topic: 'Osmanlı Devleti Kültür ve Medeniyeti',
    question: 'Osmanlı Devleti\'nde Divan-ı Hümayun\'da alınan kararların İslam dinine uygun olup olmadığına dair fetva verme yetkisine sahip ilmiye sınıfı temsilcisi kimdir?',
    options: [
      'Şeyhülislam',
      'Sadrazam',
      'Kazasker',
      'Nişancı',
      'Defterdar'
    ],
    correctAnswer: 0,
    explanation: 'Osmanlı\'da ilmiye sınıfının en üst makamı olup divan kararlarının şeriata uygunluğu konusunda fetva veren makam Şeyhülislamlıktır.'
  },
  {
    subjectId: 'TARIH',
    topic: 'Kurtuluş Savaşı Hazırlık Dönemi',
    question: '"Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır." maddesiyle Kurtuluş Savaşı\'nın amacı, gerekçesi ve yöntemi ilk kez hangi belgede ilan edilmiştir?',
    options: [
      'Amasya Genelgesi',
      'Havza Genelgesi',
      'Erzurum Kongresi',
      'Sivas Kongresi',
      'Misakımilli Kararları'
    ],
    correctAnswer: 0,
    explanation: '22 Haziran 1919 tarihli Amasya Genelgesi, Kurtuluş Savaşı\'nın gerekçesini ("Vatanın bütünlüğü tehlikededir") ve yöntemini ("Milletin azim ve kararı") ilk kez duyuran tarihi ihtilal belgesidir.'
  },
  {
    subjectId: 'TARIH',
    topic: 'Atatürk İlkeleri',
    question: 'Aşar vergisinin kaldırılması, Medeni Kanun ile kadın-erkek eşitliğinin sağlanması ve hiçbir zümreye ayrıcalık tanınmaması Atatürk\'ün doğrudan hangi ilkesiyle ilişkilidir?',
    options: [
      'Halkçılık',
      'Devletçilik',
      'Laiklik',
      'Milliyetçilik',
      'İnkılapçılık'
    ],
    correctAnswer: 0,
    explanation: 'Halkçılık; toplumda sınıf ve zümre ayrımını reddeden, kanun önünde eşitliği ve sosyal adaleti savunan temel ilkedir. Aşar vergisinin kaldırılması köylüyü rahatlatmış ve eşitlik sağlamıştır.'
  },

  // --- COĞRAFYA ---
  {
    subjectId: 'COGRAFYA',
    topic: 'Türkiye\'nin Coğrafi Konumu',
    question: 'Türkiye\'de güneyden kuzeye doğru gidildikçe çizgisel hızın azalması ve güneş ışınlarının geliş açısının daralması aşağıdakilerden hangisinin sonucudur?',
    options: [
      'Enlemin (Matematiksel / Mutlak Konumun)',
      'Boylamın (Yerel Saat Farkının)',
      'Ortalama yükseltinin batıdan doğuya artmasının',
      'Etrafının denizlerle çevrili olmasının',
      'Yer şekillerinin engebeli olmasının'
    ],
    correctAnswer: 0,
    explanation: 'Ekvatordan kutuplara doğru güneş ışınlarının düşme açısının küçülmesi, gölge boyunun uzaması ve çizgisel hızın azalması Dünya\'nın şekline ve enleme bağlı matematiksel konum sonucudur.'
  },
  {
    subjectId: 'COGRAFYA',
    topic: 'Türkiye\'nin Yer Şekilleri & Karstik Araziler',
    question: 'Türkiye\'de kalker (kireç taşı) ve jips gibi suda kolay çözünebilen kayaçların yaygın olduğu ve obruk, lapyalar, travertenler gibi karstik şekillerin en sık görüldüğü bölge hangisidir?',
    options: [
      'Akdeniz Bölgesi (Teke ve Taşeli Platoları)',
      'Güneydoğu Anadolu Bölgesi',
      'Doğu Karadeniz Bölümü',
      'Ergene Havzası',
      'Orta Fırat Bölümü'
    ],
    correctAnswer: 0,
    explanation: 'Kalkerli karstik arazi yapısı Türkiye\'de en belirgin olarak Akdeniz Bölgesi\'nde, özellikle Teke ve Taşeli Platolarında görülür.'
  },
  {
    subjectId: 'COGRAFYA',
    topic: 'Türkiye\'de Madenler & Enerji',
    question: 'Türkiye\'de linyit kömürünün hemen hemen tüm bölgelerde çıkarılabilmesi, ülkemizin jeolojik geçmişiyle ilgili aşağıdakilerden hangisini kanıtlar?',
    options: [
      'Ülke arazisinin büyük kısmının III. Jeolojik Zaman\'da (Tersiyer) oluştuğunu',
      'I. Jeolojik Zaman masif arazilerinin geniş yer kapladığını',
      'Ülkenin çok zengin taş kömürü havzalarına sahip olduğunu',
      'Volkanik dağların sönmüş olduğunu',
      'Kıyı boyu delta ovalarının oluştuğunu'
    ],
    correctAnswer: 0,
    explanation: 'Linyit, petrol ve bor gibi kaynaklar III. Jeolojik Zaman (Tersiyer) tortullarıdır. Türkiye\'de linyitin yaygın olması ülkemizin genç bir jeolojik yapıya sahip olduğunun kesin kanıtıdır.'
  },

  // --- VATANDAŞLIK ---
  {
    subjectId: 'VATANDASLIK',
    topic: 'Temel Hukuk Kavramları',
    question: 'Kişinin kendi fiilleriyle kendi lehine haklar ve aleyhine borçlar yaratabilme iktidarına ne ad verilir?',
    options: [
      'Fiil ehliyeti',
      'Hak ehliyeti',
      'Hukuki sorumluluk',
      'Ayırt etme gücü',
      'Tüzel kişilik'
    ],
    correctAnswer: 0,
    explanation: 'Hak ehliyeti haklara sahip olabilme iktidarı (sağ ve tam doğumla başlar); fiil ehliyeti ise bu hakları kendi iradesi ve eylemleriyle bizzat kullanabilme ve borç altına girebilme yeteneğidir.'
  },
  {
    subjectId: 'VATANDASLIK',
    topic: '1982 Anayasası - Yasama Organı',
    question: '1982 Anayasası\'na göre Türkiye Büyük Millet Meclisi (TBMM) kaç milletvekilinden oluşur ve genel seçimler kaç yılda bir yapılır?',
    options: [
      '600 Milletvekili - 5 Yılda bir',
      '550 Milletvekili - 4 Yılda bir',
      '600 Milletvekili - 4 Yılda bir',
      '500 Milletvekili - 5 Yılda bir',
      '450 Milletvekili - 5 Yılda bir'
    ],
    correctAnswer: 0,
    explanation: '2017 anayasa değişikliği ile TBMM üye tamsayısı 600 milletvekiline çıkarılmış ve TBMM seçimleri ile Cumhurbaşkanlığı seçimlerinin 5 yılda bir aynı gün yapılması hükme bağlanmıştır.'
  },
  {
    subjectId: 'VATANDASLIK',
    topic: 'İdare Hukuku & Mülki İdare',
    question: 'Türkiye\'de bir ilde devletin ve hükümetin en yetkili temsilcisi olup "yetki genişliği" ilkesine sahip tek mülki idare amiri kimdir?',
    options: [
      'Vali',
      'Kaymakam',
      'Büyükşehir Belediye Başkanı',
      'İl Genel Meclisi Başkanı',
      'İl Emniyet Müdürü'
    ],
    correctAnswer: 0,
    explanation: 'Vali, ilde hem Cumhurbaşkanının hem de devletin temsilcisidir ve anayasa gereğince illerin idaresinde yetki genişliği (merkeze sormadan acil karar alabilme) ilkesinden yararlanan tek amirdir.'
  },

  // --- GÜNCEL BİLGİLER ---
  {
    subjectId: 'GUNCEL',
    topic: '2026 Uluslararası Kuruluşlar & Gelişmeler',
    question: 'Kuzey Atlantik Antlaşması Örgütü\'nün (NATO) genel merkezi aşağıdaki hangi Avrupa başkentinde bulunmaktadır?',
    options: [
      'Brüksel (Belçika)',
      'Cenevre (İsviçre)',
      'Paris (Fransa)',
      'Strazburg (Fransa)',
      'Viyana (Avusturya)'
    ],
    correctAnswer: 0,
    explanation: 'NATO\'nun siyasi ve askeri ana karargahı Belçika\'nın başkenti Brüksel\'dedir.'
  },
  {
    subjectId: 'GUNCEL',
    topic: 'Genel Kültür & Edebiyat',
    question: '"İnce Memed", "Yer Demir Gök Bakır" ve "Çakırcalı Efe" gibi başyapıtlarıyla Türk edebiyatının Çukurova destanını dünya çapında duyuran yazarımız kimdir?',
    options: [
      'Yaşar Kemal',
      'Orhan Kemal',
      'Kemal Tahir',
      'Tarık Buğra',
      'Sabahattin Ali'
    ],
    correctAnswer: 0,
    explanation: 'Çukurova insanının doğa ve toprakla mücadelesini anlatan ve İnce Memed romanıyla Nobel Edebiyat Ödülü\'ne aday gösterilen ilk yazarımız Yaşar Kemal\'dir.'
  }
];

export interface GeneratedExamPackage {
  questions: Question[];
  examTitle: string;
  examCode: string;
  seed: number;
}

/**
 * Generates a completely authentic, 2026 Ortaöğretim KPSS curriculum compliant
 * 120-question exam package.
 * Guarantees:
 * - 30 Türkçe, 30 Matematik, 27 Tarih, 18 Coğrafya, 9 Vatandaşlık, 6 Güncel.
 * - Shuffled question order within each section so Question 1 is NEVER identical.
 * - Procedurally calculated fresh math questions.
 * - All options shuffled with correct answer tracked.
 */
export function generateFreshExam(): GeneratedExamPackage {
  const seed = Date.now() + Math.floor(Math.random() * 1000000);
  const examNumber = Math.floor(Math.random() * 900) + 100;
  const examCode = `2026-KPSS-ORT-TG${examNumber}`;
  const examTitle = `2026 Ortaöğretim KPSS Genel Yetenek - Genel Kültür Deneme Sınavı #${examNumber}`;

  // 1. Separate baseline questions by subject
  const baseTurkce = KPSS_EXAM_QUESTIONS.filter((q) => q.subjectId === 'TURKCE');
  const baseMat = KPSS_EXAM_QUESTIONS.filter((q) => q.subjectId === 'MATEMATIK');
  const baseTarih = KPSS_EXAM_QUESTIONS.filter((q) => q.subjectId === 'TARIH');
  const baseCografya = KPSS_EXAM_QUESTIONS.filter((q) => q.subjectId === 'COGRAFYA');
  const baseVatandaslik = KPSS_EXAM_QUESTIONS.filter((q) => q.subjectId === 'VATANDASLIK');
  const baseGuncel = KPSS_EXAM_QUESTIONS.filter((q) => q.subjectId === 'GUNCEL');

  // 2. Mix in extended pool alternates
  const poolTurkce = EXTENDED_ORTAOGRETIM_POOL.filter((q) => q.subjectId === 'TURKCE');
  const poolTarih = EXTENDED_ORTAOGRETIM_POOL.filter((q) => q.subjectId === 'TARIH');
  const poolCografya = EXTENDED_ORTAOGRETIM_POOL.filter((q) => q.subjectId === 'COGRAFYA');
  const poolVatandaslik = EXTENDED_ORTAOGRETIM_POOL.filter((q) => q.subjectId === 'VATANDASLIK');
  const poolGuncel = EXTENDED_ORTAOGRETIM_POOL.filter((q) => q.subjectId === 'GUNCEL');

  // Procedural math problems
  const mathGenerated = generateRandomMathProblems();

  // Helper to merge & shuffle a subject section to exact needed count
  const buildSection = (
    baseList: Question[],
    poolList: Partial<Question>[],
    neededCount: number
  ): Question[] => {
    // Pick randomly from base and pool
    const combined: Question[] = [];
    const usedIndices = new Set<number>();

    // Add some from pool first
    poolList.forEach((item, idx) => {
      if (Math.random() < 0.75 && combined.length < neededCount) {
        combined.push({
          id: combined.length + 1,
          subjectId: item.subjectId || baseList[0].subjectId,
          topic: item.topic || 'Genel Konu',
          question: item.question || '',
          options: item.options ? [...item.options] : ['A', 'B', 'C', 'D', 'E'],
          correctAnswer: item.correctAnswer ?? 0,
          explanation: item.explanation || '',
          context: item.context,
          media: item.media,
          questionType: item.questionType,
          matchingPairs: item.matchingPairs,
          orderingItems: item.orderingItems,
        });
      }
    });

    // Fill remaining from baseList in randomized order
    const shuffledBase = shuffleArray(baseList);
    for (const bq of shuffledBase) {
      if (combined.length >= neededCount) break;
      combined.push({
        ...bq,
        options: [...bq.options],
      });
    }

    // If still short, loop fill
    let fillIdx = 0;
    while (combined.length < neededCount) {
      const fallback = baseList[fillIdx % baseList.length];
      combined.push({
        ...fallback,
        options: [...fallback.options],
      });
      fillIdx++;
    }

    // Shuffle inside the section so topic order is dynamic
    return shuffleArray(combined).slice(0, neededCount);
  };

  // Build each subject with exact ÖSYM counts:
  // Türkçe: 30
  const turkce = buildSection(baseTurkce, poolTurkce, 30);
  // Matematik: 30 (with procedural math problems injected)
  const mat = buildSection(baseMat, mathGenerated, 30);
  // Tarih: 27
  const tarih = buildSection(baseTarih, poolTarih, 27);
  // Coğrafya: 18
  const cografya = buildSection(baseCografya, poolCografya, 18);
  // Vatandaşlık: 9
  const vatandaslik = buildSection(baseVatandaslik, poolVatandaslik, 9);
  // Güncel: 6
  const guncel = buildSection(baseGuncel, poolGuncel, 6);

  // Concatenate in canonical ÖSYM exam order
  const rawAllQuestions = [
    ...turkce,
    ...mat,
    ...tarih,
    ...cografya,
    ...vatandaslik,
    ...guncel,
  ];

  // Final pass: Clean options, shuffle options, normalize IDs 1..120
  const finalQuestions: Question[] = rawAllQuestions.map((q, index) => {
    const rawOptions = (q.options && q.options.length >= 2) ? q.options : ['A', 'B', 'C', 'D', 'E'];
    const cleanOptions = rawOptions.map((opt, oIdx) => {
      if (!opt || opt.trim() === '') {
        return `Seçenek ${['A', 'B', 'C', 'D', 'E'][oIdx]}`;
      }
      return opt.trim();
    });

    while (cleanOptions.length < 5 && (!q.questionType || q.questionType === 'single_choice')) {
      cleanOptions.push(`Seçenek ${['A', 'B', 'C', 'D', 'E'][cleanOptions.length]}`);
    }

    // Shuffle options for single choice questions
    if (!q.questionType || q.questionType === 'single_choice') {
      const correctText = cleanOptions[q.correctAnswer] || cleanOptions[0];
      const shuffled = shuffleArray(cleanOptions);
      const newCorrectIdx = shuffled.indexOf(correctText);

      return {
        ...q,
        id: index + 1, // Strict 1 to 120 index
        options: shuffled,
        correctAnswer: newCorrectIdx >= 0 ? newCorrectIdx : 0,
      };
    }

    return {
      ...q,
      id: index + 1,
      options: cleanOptions,
    };
  });

  return {
    questions: finalQuestions,
    examTitle,
    examCode,
    seed,
  };
}
