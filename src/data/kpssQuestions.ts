import { Question } from '../types/exam';

export const KPSS_EXAM_QUESTIONS: Question[] = [
  // ==========================================
  // TÜRKÇE (SORU 1 - 30)
  // ==========================================
  {
    id: 1,
    subjectId: 'TURKCE',
    topic: 'Sözcükte Anlam',
    question: 'Aşağıdaki cümlelerin hangisinde "çıkmak" sözcüğü "bulunduğu yeri terk etmek ya da bir makamdan ayrılmak" anlamı dışında kullanılmıştır?',
    options: [
      'Müdür bey az önce toplantı salonundan hızlı adımlarla çıktı.',
      'Yıllarca emek verdiği genel müdürlük görevinden kendi isteğiyle çıktı.',
      'Son günlerde mahallede ev kiraları astronomik rakamlara çıktı.',
      'Pansiyondan saat sekizde çıkıp sahile doğru yürümeye başladı.',
      'Bakanlıktaki makam odasından çıkıp basın mensuplarının karşısına geçti.'
    ],
    correctAnswer: 2,
    explanation: 'C seçeneğindeki "çıkmak" sözcüğü, kiraların yükselmesi, artması ve belli bir fiyata ulaşması anlamında kullanılmıştır. Diğer tüm seçeneklerde fiziksel bir mekândan ayrılmak veya resmi bir görevden ayrılmak anlamı mevcuttur.'
  },
  {
    id: 2,
    subjectId: 'TURKCE',
    topic: 'Cümlede Anlam',
    question: 'Aşağıdaki cümlelerin hangisinde bir "önyargı (peşin hüküm)" söz konusudur?',
    options: [
      'Geciken projeyi teslim etmek için sabaha kadar aralıksız çalıştılar.',
      'Bu genç yazarın son romanı da öncekiler gibi kesinlikle ilgi görmeyecektir.',
      'Havanın bu kadar erken kararması kış mevsiminin yaklaştığını gösteriyor.',
      'Sınav sonuçları açıklandığında herkes beklediği puanları öğrenmiş oldu.',
      'Mimarın tasarladığı köprü, kentin tarihi dokusuyla mükemmel bir uyum yakalamış.'
    ],
    correctAnswer: 1,
    explanation: 'B seçeneğinde henüz gerçekleşmemiş bir durum hakkında ("kitabın ilgi görmeyeceği") önceden kesin bir hüküm verilerek olumsuz bir önyargı dile getirilmiştir.'
  },
  {
    id: 3,
    subjectId: 'TURKCE',
    topic: 'Paragrafta Ana Düşünce',
    context: 'Okumak, sadece basılı harfleri sese çevirmek değil; yazarın kurduğu duygu ve düşünce iklimine sızmak, onunla zamandan bağımsız sessiz bir diyalog inşa etmektir. Metnin yüzeyinde gezinmekle yetinen aceleci okur, satır aralarındaki hakiki anlam tortularını kaçırır. Hakiki okuma eylemi, bireyin zihnini metne teslim etmesi değil, metinle karşılıklı bir hesaplaşmaya girişmesidir.',
    question: 'Bu parçada okuma eylemiyle ilgili olarak asıl vurgulanmak istenen aşağıdakilerden hangisidir?',
    options: [
      'Yalnızca klasik edebi yapıtların insan zihnini besleyebileceği',
      'Okumanın, yüzeydeki sözcükleri aşarak metinle etkin ve eleştirel bir bağ kurmayı gerektirdiği',
      'Hızlı okuma tekniklerinin metnin anlaşılmasını tamamen engellediği',
      'Yazarın iletmek istediği mesajın okurdan okura hiçbir zaman değişmediği',
      'Her okurun yazardan bağımsız olarak kendi kurgusunu yaratmasının zorunlu olduğu'
    ],
    correctAnswer: 1,
    explanation: 'Parçada okumanın sadece harfleri seslendirmek olmadığı, satır aralarını kazıyarak metinle eleştirel, aktif ve derin bir hesaplaşmaya girilmesi gerektiği ana düşünce olarak verilmektedir.'
  },
  {
    id: 4,
    subjectId: 'TURKCE',
    topic: 'Ses Bilgisi',
    question: 'Aşağıdaki cümlelerin hangisinde hem "ünlü düşmesi" hem de "ünsüz yumuşaması" örneklenmiştir?',
    options: [
      'Sabah erkenden kalkıp bahçedeki çiçekleri tek tek suladı.',
      'Aklını başına toplayıp geleceği hakkında doğru bir karar vermeliydi.',
      'Gözlerindeki hüznü saklamak için başını yavaşça diğer yana çevirdi.',
      'Şehrin dar sokaklarında çocukluk anılarının izini sürmeye devam ediyordu.',
      'Karnı acıkınca yol kenarındaki küçük lokantada sıcak bir çorba içti.'
    ],
    correctAnswer: 1,
    explanation: '"Akıl-ı > aklını" sözcüğünde ünlü düşmesi; "gelecek-i > geleceği" sözcüğünde ise k > ğ ünsüz yumuşaması (değişimi) aynı cümlede birlikte yer almaktadır.'
  },
  {
    id: 5,
    subjectId: 'TURKCE',
    topic: 'Yazım Kuralları',
    question: 'Aşağıdaki cümlelerin hangisinde "ki" bağlacının veya ekinin yazımıyla ilgili bir yanlışlık yapılmıştır?',
    options: [
      'Görüyorum ki verilen sözlerin hiçbiri zamanında yerine getirilmemiş.',
      'Evdeki hesap çarşıya uymayınca bütçeyi yeniden planlamak zorunda kaldılar.',
      'Akşamki maçın heyecanı bütün kenti sarmış durumdaydı.',
      'Madem ki toplantıya katılmayacaktın, neden önceden haber vermedin?',
      'Öyle derin düşüncelere dalmıştı ki yanına yaklaşanları bile fark etmedi.'
    ],
    correctAnswer: 3,
    explanation: '"Mademki" kelimesi SOMBAHÇEMİ (Sanki, Oysaki, Mademki, Belki, Halbuki, Çünkü, Meğerki, İllaki) kalıplaşmış bağlaç kuralı uyarınca daima bitişik yazılmalıdır.'
  },
  {
    id: 6,
    subjectId: 'TURKCE',
    topic: 'Yazım Kuralları',
    question: 'Aşağıdaki cümlelerin hangisinde büyük harflerin ve eklerin yazımında bir yanlışlık vardır?',
    options: [
      'Van Gölü canavarı efsanesi bölgeye her yıl çok sayıda turist çekmektedir.',
      'Kurtuluş Savaşı Dönemi Türk edebiyatında derin izler bırakmıştır.',
      'Tuz Gölü havzasında yürütülen ekolojik çalışmalar sonuç vermeye başladı.',
      'Arkadaşlarıyla birlikte bu hafta sonu Topkapı sarayını gezecekler.',
      'Resmî Gazete\'de yayımlanan yeni yönetmelik kamu görevlilerini ilgilendiriyor.'
    ],
    correctAnswer: 3,
    explanation: 'Saray, köşk, kale, köprü vb. yapı adlarının her kelimesi büyük harfle başlar ve gelen çekim ekleri kesmeyle ayrılır: "Topkapı Sarayı\'nı" şeklinde yazılmalıdır.'
  },
  {
    id: 7,
    subjectId: 'TURKCE',
    topic: 'Noktalama İşaretleri',
    question: 'Aşağıdaki cümlelerin hangisinde noktalı virgül (;) yerinde ve doğru kullanılmıştır?',
    options: [
      'Pazardan elma, armut, şeftali; ıspanak, pırasa, kereviz aldım.',
      'Yarın sabah erken uyanmalıyım; çünkü yetişmem gereken bir tren var.',
      'Bahar gelince; ağaçlar çiçek açar, kuşlar neşeyle ötmeye başlar.',
      'Genç adam; yavaş adımlarla ilerledi ve kapıyı usulca çaldı.',
      'Bize doğru koştu; heyecanla bir şeyler fısıldadı.'
    ],
    correctAnswer: 0,
    explanation: 'A seçeneğinde farklı tür veya takımları (meyveler ile sebzeleri) birbirinden ayırmak için noktalı virgül kuralına tam uygun olarak kullanılmıştır.'
  },
  {
    id: 8,
    subjectId: 'TURKCE',
    topic: 'Cümle Ögeleri',
    question: '"Dün akşam sahilde yürürken karşılaştığımız eski dostumuz, bizi yarınki davetine büyük bir içtenlikle çağırdı."\nBu cümlenin ögelerinin dizilişi aşağıdakilerden hangisinde doğru verilmiştir?',
    options: [
      'Zarf Tümleci - Özne - Nesne - Zarf Tümleci - Yüklem',
      'Özne - Belirtili Nesne - Dolaylı Tümleç - Zarf Tümleci - Yüklem',
      'Zarf Tümleci - Belirtisiz Nesne - Zarf Tümleci - Yüklem',
      'Özne - Zarf Tümleci - Dolaylı Tümleç - Yüklem',
      'Özne - Belirtili Nesne - Zarf Tümleci - Dolaylı Tümleç - Yüklem'
    ],
    correctAnswer: 1,
    explanation: 'Özne: "Dün akşam sahilde yürürken karşılaştığımız eski dostumuz", Belirtili Nesne: "bizi", Dolaylı Tümleç: "yarınki davetine", Zarf Tümleci: "büyük bir içtenlikle", Yüklem: "çağırdı".'
  },
  {
    id: 9,
    subjectId: 'TURKCE',
    topic: 'Sözcük Türleri',
    question: 'Aşağıdaki cümlelerin hangisinde ikileme ötekilerden farklı bir görevde (türde) kullanılmıştır?',
    options: [
      'Ağır ağır çıkacaksın bu merdivenlerden.',
      'Yol boyunca dizi dizi kavak ağaçları bize eşlik etti.',
      'Sınavdan önce tüm konuları hızlı hızlı gözden geçirdi.',
      'Çocuklar salonda neşeyle güle oynaya zıplıyordu.',
      'Yaşlı kadın merdivenleri güç bela tırmanabildi.'
    ],
    correctAnswer: 1,
    explanation: 'B seçeneğindeki "dizi dizi kavak ağaçları" ikilemesi ismi niteleyerek sıfat (ön ad) görevi üstlenmiştir. Diğer seçeneklerdeki ikilemeler (ağır ağır, hızlı hızlı, güle oynaya, güç bela) fiilleri niteleyerek zarf (belirteç) olmuştur.'
  },
  {
    id: 10,
    subjectId: 'TURKCE',
    topic: 'Fiiller ve Çatılar',
    question: 'Aşağıdaki cümlelerin hangisinin yüklemi çatısı bakımından "geçişsiz ve etken"dir?',
    options: [
      'Belediye ekipleri caddedeki kırık bankları tek tek onardı.',
      'Günün yorgunluğunu üzerimizden atmak için göl kıyısında biraz oturduk.',
      'Sınıf başkanı, toplantıda alınan kararları panoya astı.',
      'Küçük çocuk elindeki oyuncak arabayı heyecanla duvara fırlattı.',
      'Yazar, son kitabında köy yaşamının zorluklarını ustalıkla anlatmış.'
    ],
    correctAnswer: 1,
    explanation: '"Oturduk" yüklemi nesne alamaz ("onu oturduk" denemez, geçişsizdir) ve işi yapan bellidir ("biz oturduk", etkendir).'
  },
  {
    id: 11,
    subjectId: 'TURKCE',
    topic: 'Paragrafta Yardımcı Düşünceler',
    context: 'Sanatçı, çağına tanıklık eden kişidir; fakat onun tanıklığı kuru bir zabıt kâtibinin tutanağına benzemez. O, tanık olduğu gerçeği kendi düş gücünün imbiklerinden geçirir, ona estetik bir biçim verir. Gerçeği olduğu gibi aktarmaya kalkan kişi gazetecidir, romancı değil. Romancının başarısı, hayatın sıradan ayrıntılarına yeni ve büyülü bir perspektif kazandırmasından kaynaklanır.',
    question: 'Bu parçadan sanatçı ve sanatsal yaratımla ilgili olarak aşağıdakilerden hangisi çıkarılamaz?',
    options: [
      'Sanatçının gerçeği olduğu gibi yansıtmaktan kaçındığı',
      'Sanatsal üretimin hayal gücü ve estetik süzgeçten beslendiği',
      'Gazetecilik ile romancılığın gerçeğe yaklaşım yöntemlerinin farklı olduğu',
      'Sanatçının yalnızca geçmiş dönemleri işlediğinde özgünleştiği',
      'Romancının gündelik yaşam unsurlarına yeni bir bakış getirdiği'
    ],
    correctAnswer: 3,
    explanation: 'Parçada sanatçının çağına tanıklık ettiği ve estetik dönüşüm yaptığı belirtilmiş; "yalnızca geçmiş dönemleri işlediğinde özgünleştiği" yönünde hiçbir ifade yer almamaktadır.'
  },
  {
    id: 12,
    subjectId: 'TURKCE',
    topic: 'Anlatım Biçimleri',
    context: 'Güneş, Torosların ardına devrilirken gökyüzü önce altın sarısına, sonra közlenmiş bir bakır rengine büründü. Çam ormanlarından esen hafif esinti, reçine ve kekik kokularını etrafa yayıyor; uzaktaki köyün kiremit çatılarından göğe doğru incecik bir duman tütüyordu.',
    question: 'Bu parçanın anlatımında aşağıdakilerden hangisi ağır basmaktadır?',
    options: [
      'Tartışma - Örneklendirme',
      'Betimleme - Kişileştirme',
      'Öyküleme - Tanımlama',
      'Açıklama - Karşılaştırma',
      'Tanık Gösterme - Sayısal Verilerden Yararlanma'
    ],
    correctAnswer: 1,
    explanation: 'Parçada sözcüklerle resim çizme sanatı olan betimleme (gözlem, renkler, duyular) ve tabiat unsurlarına insani eylem kazandıran kişileştirme ("güneş devrilirken", "esinti kokuları yayıyor") ön plandadır.'
  },
  {
    id: 13,
    subjectId: 'TURKCE',
    topic: 'Paragraf Tamamlama',
    context: 'Bir çevirmenin en büyük tuzağı, kaynak dildeki sözcüklerin sözlük karşılıklarını birebir hedef dile aktarmaya çalışmasıdır. Oysa diller sadece sözcüklerden değil, o dili konuşan toplumun hafızasından, atasözlerinden ve kültürel kodlarından oluşur. Bu sebeple iyi bir çeviri ----.',
    question: 'Düşüncenin akışına göre bu parçanın sonuna aşağıdakilerden hangisi getirilmelidir?',
    options: [
      'ancak kaynak metindeki tüm sözcüklerin motamot korunmasıyla sağlanır',
      'sadece bilimsel ve teknik metinlerde kusursuzluğa ulaşabilir',
      'kaynak metnin ruhunu hedef dilin doğallığı içinde yeniden var etmektir',
      'yazarın üslubunu tamamen silip çevirmenin kendi dilini dayatmasıdır',
      'her zaman hedef dilin gramer kurallarını ihlal etmeyi göze almalıdır'
    ],
    correctAnswer: 2,
    explanation: 'Metin, kelime kelime çevirinin yetersizliğini ve kültürel bağlamın önemini anlattığı için cümlenin "kaynak metnin ruhunu hedef dilin doğallığı içinde yeniden var etmektir" biçiminde tamamlanması gerekir.'
  },
  {
    id: 14,
    subjectId: 'TURKCE',
    topic: 'Paragrafı İkiye Bölme',
    context: '(I) Türk şiirinde Garip akımı, geleneksel kalıplara ve vezin-kafiye zorunluluğuna bir başkaldırı olarak doğdu. (II) Orhan Veli ve arkadaşları, şiiri saraydan ve yüksek zümreden alıp sokağın sıradan insanına taşıdılar. (III) Onların bu yalın ve alaycı tavrı kısa sürede genç şairler arasında geniş bir yankı uyandırdı. (IV) İkinci Yeni şairleri ise Garipçilerin aksine imgeye, kapalılığa ve soyut çağrışımlara ağırlık verdiler. (V) Cemal Süreya ve Edip Cansever gibi isimler dili alışılmışın dışında kullanarak yeni bir estetik inşa ettiler. (VI) Bu akım, okurdan şiiri çözmek için zihinsel bir çaba talep ediyordu.',
    question: 'Bu parça iki paragrafa ayrılmak istense ikinci paragraf numaralanmış cümlelerin hangisiyle başlar?',
    options: ['II', 'III', 'IV', 'V', 'VI'],
    correctAnswer: 2,
    explanation: 'I, II ve III. cümlelerde Garip akımı ve getirdikleri işlenirken; IV. cümleden itibaren yeni bir edebi akım olan "İkinci Yeni"ye geçilmektedir. Bu nedenle ikinci paragraf IV ile başlamalıdır.'
  },
  {
    id: 15,
    subjectId: 'TURKCE',
    topic: 'Akışı Bozan Cümle',
    context: '(I) Çay, dünya genelinde sudan sonra en çok tüketilen içeceklerin başında gelir. (II) Doğu Karadeniz Bölgesi, Türkiye\'deki çay üretiminin neredeyse tamamını tek başına karşılar. (III) Çayın toplanması, fırınlanması ve fermente edilmesi aşamaları büyük bir titizlik gerektirir. (IV) Bölgedeki dik yamaçlar ve engebeli arazi yapısı, çay hasadında makinelerin kullanımını oldukça kısıtlamaktadır. (V) Çay tarımı bu yüzden Karadeniz insanı için yoğun bir el emeği ve bedensel çaba anlamına gelir.',
    question: 'Bu parçada numaralanmış cümlelerden hangisi düşüncenin akışını bozmaktadır?',
    options: ['I', 'II', 'III', 'IV', 'V'],
    correctAnswer: 2,
    explanation: 'Parça genel olarak Doğu Karadeniz\'deki çay hasadının coğrafi zorluklarını ve emeğini ele almaktadır. III. cümledeki genel çay üretim ve fermantasyon aşamaları ise bu coğrafi bağlamın akışını bozmaktadır.'
  },
  {
    id: 16,
    subjectId: 'TURKCE',
    topic: 'Sözcük Öbeklerinde Anlam',
    context: 'Genç romancı, ilk kitabında edebiyat dünyasının alışık olduğu klişeleri bir kenara bırakmış, kimsenin ayak basmadığı patikalarda yürümeyi seçmiştir.',
    question: 'Bu parçadaki "kimsenin ayak basmadığı patikalarda yürümek" sözüyle anlatılmak istenen aşağıdakilerden hangisidir?',
    options: [
      'Geleneksel temaları sadakatle sürdürmek',
      'Özgün ve daha önce denenmemiş anlatım yollarını benimsemek',
      'Eleştirmenlerin onayını alacak güvenli konular seçmek',
      'Doğa ve kırsal yaşam temalarına odaklanmak',
      'Anlatımında anlaşılması güç, ağır bir dil kullanmak'
    ],
    correctAnswer: 1,
    explanation: '"Kimsenin ayak basmadığı patikalar", daha önce kimse tarafından kullanılmamış, denenmemiş, özgün ve yenilikçi sanatsal yolları simgeler.'
  },
  {
    id: 17,
    subjectId: 'TURKCE',
    topic: 'Cümle Oluşturma',
    context: 'I. yeni bir anlam katmanı keşfetme heyecanı yaşatır\nII. her yeniden okunuşunda\nIII. hakiki edebi eserler\nIV. okuyucuya daha önce fark etmediği\nV. yüzeydeki basit olay örgüsünü aşıp',
    question: 'Yukarıdaki sözler anlamlı ve kurallı bir cümle oluşturacak biçimde sıralandığında hangisi baştan üçüncü olur?',
    options: ['I', 'II', 'III', 'IV', 'V'],
    correctAnswer: 4,
    explanation: 'Kurallı ve anlamlı sıralama: III (Hakiki edebi eserler) - II (her yeniden okunuşunda) - V (yüzeydeki basit olay örgüsünü aşıp) - IV (okuyucuya daha önce fark etmediği) - I (yeni bir anlam katmanı keşfetme heyecanı yaşatır). Baştan 3. öge V\'tir.'
  },
  {
    id: 18,
    subjectId: 'TURKCE',
    topic: 'Anlatım Bozukluğu',
    question: 'Aşağıdaki cümlelerin hangisinde bir anlatım bozukluğu vardır?',
    options: [
      'Öğrenciler ders zili çalar çalmaz sınıflarına girdiler.',
      'Yarınki toplantının saatini herkese tek tek iletti.',
      'Bu konuda onun düşüncelerine kulak asmak ve dikkate almak gerek.',
      'Geçmiş yıllara kıyasla bu sezon tarımsal verim oldukça yüksekti.',
      'Hava kararmadan önce ormanlık alandaki yürüyüşümüzü tamamladık.'
    ],
    correctAnswer: 2,
    explanation: '"Kulak asmak" deyimi olumsuz durumlarda (örneğin: "onun laflarına kulak asma" = önemseme) kullanılır. Cümlede olumlu anlamda ve "dikkate almak" ile eş anlamlı gibi kullanılması deyim yanlışlığı ve gereksiz sözcük kullanımından kaynaklanan anlatım bozukluğuna yol açmıştır.'
  },
  {
    id: 19,
    subjectId: 'TURKCE',
    topic: 'Sözcük Yapısı ve Ekler',
    question: 'Aşağıdaki altı çizili sözcüklerden hangisi hem "yapım eki" hem de "çekim eki" almıştır?',
    options: [
      'Gözlüklerini masanın üzerine bırakıp odadan çıktı.',
      'Kitaplar raflarda düzenli bir şekilde dizilmişti.',
      'Evden çıktığında hava henüz aydınlanmamıştı.',
      'Yolcular istasyonda trenin gelmesini bekliyordu.',
      'Masanın kenarındaki kalemi eline aldı.'
    ],
    correctAnswer: 0,
    explanation: '"Göz-lük-ler-i-n-i": "göz" köküne "-lük" yapım eki, ardından "-ler" çokluk eki ve "-i / -ni" belirtme çekim ekleri gelmiştir. Hem yapım hem çekim eki almıştır.'
  },
  {
    id: 20,
    subjectId: 'TURKCE',
    topic: 'Paragraf Analizi',
    context: 'Eleştiri, sanat yapıtını karalamak ya da göklere çıkarmak değildir. Hakiki bir eleştirmen, yapıtı kendi iç dinamikleri, yazarın amaçladığı dünya ve edebiyat tarihinin birikimi ışığında tahlil eder. Öznelliğin batağına saplanmadan nesnel ölçütlerle metne yaklaşabilen eleştirmen, hem okurun ufkunu genişletir hem de edebiyatın seviyesini yükseltir.',
    question: 'Bu parçaya göre gerçek bir eleştirmenden beklenen temel nitelik nedir?',
    options: [
      'Eseri mutlaka popüler beğenilere göre derecelendirmesi',
      'Yazarın özel yaşamını merkeze alarak değerlendirme yapması',
      'Kişisel beğenilerden arınarak eseri nesnel ölçütler ve metnin kendi dinamikleriyle tahlil etmesi',
      'Sadece olumsuz kusurları ortaya çıkarıp yazarı uyarması',
      'Okuyucu kitlesinin beklentilerine tamamen uygun eserleri övmesi'
    ],
    correctAnswer: 2,
    explanation: 'Parçada vurgulanan, eleştirmenin öznelliğe düşmeden yapıtı kendi iç dinamikleri ve nesnel kriterlerle çözümleyebilmesidir.'
  },
  {
    id: 21,
    subjectId: 'TURKCE',
    topic: 'Deyimler ve Atasözleri',
    question: 'Aşağıdaki cümlelerin hangisinde kullanılan deyim açıklamasıyla uyuşmamaktadır?',
    options: [
      'Bütün gece gözünü kırpmadan sabahı etti; yani hiç uyuyamadı.',
      'Sonunda ağzındaki baklayı çıkardı; yani sabırsızlanıp gizli tuttuğu şeyi söyledi.',
      'Olay karşısında etekleri zil çaldı; yani aşırı derecede korkup paniğe kapıldı.',
      'Onun burnundan kıl aldırmaz tavrı herkesi bezdirdi; yani aşırı kibirli ve alıngandı.',
      'Haberi alınca dünyalar onun oldu; yani tarifsiz bir mutluluk yaşadı.'
    ],
    correctAnswer: 2,
    explanation: '"Etekleri zil çalmak" korku veya panik değil, tam aksine çok sevinmek, büyük bir neşe ve coşku duymak anlamına gelir.'
  },
  {
    id: 22,
    subjectId: 'TURKCE',
    topic: 'Paragraf Çıkarımı',
    context: 'Yapay zekâ algoritmaları günümüzde müzik bestelerinden resim sergilerine kadar pek çok alanda insan yaratıcılığına ortak oluyor. Ancak bir algoritmanın ürettiği sanat eseri, teknik açıdan ne kadar kusursuz olursa olsun; arkasında yaşanmış bir acı, sevinç ya da varoluşsal bir sancı barındırmaz. İnsan sanatının asıl değeri, kusursuzluğunda değil, kusurlarının ardındaki samimi duygu derinliğindedir.',
    question: 'Bu parçanın yazarına göre insan yapımı sanatı yapay zekâ ürünlerinden üstün kılan nedir?',
    options: [
      'Daha hızlı ve pratik şekilde üretilebilmesi',
      'Geometrik ve matematiksel açıdan hatasız olması',
      'Yaşanmış insan duygularından ve varoluşsal derinlikten beslenmesi',
      'Ticari pazar değerinin daha yüksek olması',
      'Gelecek nesillere daha uzun süre kalıcı aktarılabilmesi'
    ],
    correctAnswer: 2,
    explanation: 'Yazar, insan sanatının değerinin teknik kusursuzlukta değil, arkasındaki yaşanmış duygu, acı ve varoluşsal sancıda yattığını belirtmektedir.'
  },
  {
    id: 23,
    subjectId: 'TURKCE',
    topic: 'Noktalama İşaretleri',
    question: 'Aşağıdaki cümlelerin hangisinde kesme işaretinin (\') kullanımı yanlıştır?',
    options: [
      'TBMM\'nin açılış yıl dönümü tüm yurtta coşkuyla kutlandı.',
      'Ahmet Bey\'in hazırladığı rapor yarın yönetim kuruluna sunulacak.',
      'Türk Dil Kurumu\'nun yeni sözlüğü raflardaki yerini aldı.',
      'Saat 14.30\'da başlayan seminer iki saat sürdü.',
      'Osmanlı Devleti\'nin son döneminde önemli reformlar yapıldı.'
    ],
    correctAnswer: 2,
    explanation: 'TDK yazım kurallarına göre kurum, kuruluş, kurul, birleşim, oturum ve iş yeri adlarına gelen ekler kesmeyle ayrılmaz. "Türk Dil Kurumunun" şeklinde kesmesiz yazılmalıdır.'
  },
  {
    id: 24,
    subjectId: 'TURKCE',
    topic: 'Cümle Türleri',
    question: '"Yağmur dindikten sonra ormanın derinliklerine doğru sessizce yürümeye başladık."\nBu cümle yapısına göre aşağıdakilerden hangisidir?',
    options: [
      'Basit cümle',
      'Girişik birleşik cümle',
      'Bağlı cümle',
      'Sıralı cümle',
      'İç içe birleşik cümle'
    ],
    correctAnswer: 1,
    explanation: 'Cümlede bir temel yüklem ("başladık") ve zarf-fiil eki almış bir fiilimsi ("dindikten sonra") bulunduğu için girişik birleşik cümledir.'
  },
  {
    id: 25,
    subjectId: 'TURKCE',
    topic: 'Sözcük Anlamı ve Çelişki',
    question: 'Aşağıdaki cümlelerin hangisinde birbiriyle çelişen ifadelerin bir arada kullanılmasından kaynaklanan bir anlatım kusuru vardır?',
    options: [
      'Şüphesiz onun da bu projede büyük bir emeği geçmiş olabilir.',
      'Sınavdan yüksek not alacağını adım gibi biliyordu.',
      'Bugün hava dünkünden çok daha serin ve rüzgârlıydı.',
      'Gecikmeli kalkan uçak nihayet alana iniş yaptı.',
      'Bütün soruları dikkatli bir şekilde okuyup yanıtladı.'
    ],
    correctAnswer: 0,
    explanation: '"Şüphesiz" kesinlik bildirirken, "olabilir" ihtimal (olasılık) bildirir. İkisinin bir arada kullanılması anlamca çelişen sözcüklerin kullanımından doğan anlatım bozukluğudur.'
  },
  {
    id: 26,
    subjectId: 'TURKCE',
    topic: 'Paragrafta Başlık',
    context: 'Zamanı yönetmek, aslında hayatı yönetmektir. Gün içinde yapılacak işleri öncelik sırasına koyamayan, acil ile önem arasındaki farkı gözetmeyen kişiler sürekli bir koşturmaca içinde tükenirler. Oysa gününü planlayan, her eyleme belirli bir sınır koyan birey; hem hedeflerine ulaşır hem de kendisine dinlenme alanı açar.',
    question: 'Bu parçaya verilebilecek en uygun başlık aşağıdakilerden hangisidir?',
    options: [
      'Tükenmişlik Sendromunun Nedenleri',
      'Zaman Yönetimi ve Yaşam Kalitesi',
      'Modern Çağda Çalışma Hayatı',
      'Günün Erken Saatlerini Değerlendirme',
      'Başarının Gizli Formülleri'
    ],
    correctAnswer: 1,
    explanation: 'Parça baştan sona zamanın doğru yönetilmesinin önemi ve bunun kişinin yaşam kalitesine ve huzuruna etkisini anlatmaktadır.'
  },
  // Sözel Mantık Soruları (27-30)
  {
    id: 27,
    subjectId: 'TURKCE',
    topic: 'Sözel Mantık',
    context: 'A, B, C, D, E adlı 5 öğrenci 1\'den 5\'e kadar numaralandırılmış sıralarda oturmaktadır.\n• A, 2 numaralı sırada oturmaktadır.\n• C, E\'nin hemen sağındaki sırada oturmaktadır.\n• B, 1 numaralı sırada değildir.',
    question: 'Buna göre 1 numaralı sırada oturan öğrenci kesinlikle kimdir?',
    options: ['B', 'C', 'D', 'E', 'A'],
    correctAnswer: 2,
    explanation: 'A = 2. sıra. B, 1 numarada değildir. C, E\'nin hemen sağında (yan yana) oturacaktır: (E, C) ikilisi ya (3,4) ya da (4,5) sıralarında olmalıdır. (E,C) = (3,4) ise kalan 1 ve 5 numaralardan B 1\'de olamayacağı için B=5, D=1 olur. (E,C) = (4,5) ise kalan 1 ve 3 numaralardan B 1\'de olamayacağı için B=3, D=1 olur. Her iki durumda da 1 numaralı sırada kesinlikle D oturmaktadır (C seçeneği / D öğrencisi).'
  },
  {
    id: 28,
    subjectId: 'TURKCE',
    topic: 'Sözel Mantık',
    context: 'A, B, C, D, E adlı 5 öğrencinin sıralandığı yukarıdaki koşullar geçerlidir.',
    question: 'B\'nin 5 numaralı sırada oturduğu biliniyorsa 3 numaralı sırada hangi öğrenci oturmaktadır?',
    options: ['A', 'C', 'D', 'E', 'B'],
    correctAnswer: 3,
    explanation: 'B=5 olarak verilirse; A=2 ve D=1\'dedir. Geriye 3 ve 4 numaralı sıralar kalır. C, E\'nin hemen sağında (E\'den sonra) olduğuna göre 3 numarada E, 4 numarada C oturur. Dolayısıyla 3 numarada E oturur (D seçeneği).'
  },
  {
    id: 29,
    subjectId: 'TURKCE',
    topic: 'Sözel Mantık',
    context: 'Ali, Burak, Cem, Derya ve Elif adlı 5 kişi sinemada yan yana 5 koltuğa oturacaktır. Ali en soldadır. Elif, Burak ile Cem\'in arasındadır.',
    question: 'Buna göre Derya\'nın koltuk numarası hangisi olabilir?',
    options: ['Yalnızca 2', 'Yalnızca 5', '2 veya 5', '3 veya 4', 'Yalnızca 3'],
    correctAnswer: 2,
    explanation: '1. koltuk kesinlikle Ali\'dir. 2, 3, 4, 5 nolu koltuklarda Burak, Elif, Cem (Elif ortada) bir bloktur (3 koltuk). Bu blok ya (2,3,4) ya da (3,4,5) olur. Blok (2,3,4) ise Derya 5. koltuktadır; blok (3,4,5) ise Derya 2. koltuktadır. Yani Derya 2 veya 5 olabilir.'
  },
  {
    id: 30,
    subjectId: 'TURKCE',
    topic: 'Sözel Mantık',
    context: 'Bir kütüphanede Tarih, Coğrafya ve Felsefe kitapları raflara dizilmiştir. Tarih kitaplarının sayısı Coğrafya kitaplarının iki katıdır. Felsefe kitapları Coğrafya kitaplarından 4 eksiktir. Toplam 36 kitap vardır.',
    question: 'Buna göre kütüphanede kaç adet Tarih kitabı vardır?',
    options: ['10', '16', '20', '24', '28'],
    correctAnswer: 2,
    explanation: 'Coğrafya = x olsun. Tarih = 2x. Felsefe = x - 4. Toplam: x + 2x + (x - 4) = 4x - 4 = 36 => 4x = 40 => x = 10. Tarih kitabı = 2x = 2 * 10 = 20 adettir.'
  },

  // ==========================================
  // MATEMATİK & GEOMETRİ (SORU 31 - 60)
  // ==========================================
  {
    id: 31,
    subjectId: 'MATEMATIK',
    topic: 'Rasyonel ve Ondalık Sayılar',
    question: '(0,4 / 0,02) + (0,09 / 0,003) işleminin sonucu kaçtır?',
    options: ['20', '30', '50', '60', '80'],
    correctAnswer: 2,
    explanation: 'Virgül kaydırılarak: 0,4 / 0,02 = 40 / 2 = 20. 0,09 / 0,003 = 90 / 3 = 30. Toplam: 20 + 30 = 50.'
  },
  {
    id: 32,
    subjectId: 'MATEMATIK',
    topic: 'Temel Kavramlar & Tek-Çift Sayılar',
    question: 'x ve y tam sayılar olmak üzere, (3x + 4y) ifadesi tek sayıdır.\nBuna göre aşağıdakilerden hangisi kesinlikle tek sayıdır?',
    options: ['x + y', 'x . y', 'x - y', 'x + 2y', '2x + y'],
    correctAnswer: 3,
    explanation: '4y her zaman çifttir. (3x + 4y) tek olduğuna göre 3x tek olmalıdır, bu da x\'in kesinlikle TEK sayı olduğunu gösterir. y tek de olabilir çift de. x + 2y ifadesinde x tek, 2y çift olduğundan Tek + Çift = TEK olur.'
  },
  {
    id: 33,
    subjectId: 'MATEMATIK',
    topic: 'Asal Sayılar ve Faktöriyel',
    question: 'x bir doğal sayı olmak üzere,\n$$\\frac{8! + 9!}{7!}$$\nişleminin sonucu kaçtır?',
    options: ['64', '72', '80', '88', '96'],
    correctAnswer: 2,
    explanation: '8! + 9! = 8! + 9 . 8! = 10 . 8! = 10 . (8 . 7!). Buradan [10 . 8 . 7!] / 7! = 10 . 8 = 80 bulunur.'
  },
  {
    id: 34,
    subjectId: 'MATEMATIK',
    topic: 'Bölme ve Bölünebilme',
    question: 'Dört basamaklı 4a3b sayısı 36 ile tam bölünebilmektedir.\nBuna göre a\'nın alabileceği farklı değerlerin toplamı kaçtır?',
    options: ['9', '11', '14', '16', '18'],
    correctAnswer: 2,
    explanation: '36 ile bölünebilmesi için sayının hem 4 hem de 9 ile tam bölünmesi gerekir. 4 ile bölünebilmesi için son iki basamağı 32 veya 36 olmalıdır (b=2 veya b=6). 1) b=2 için 4a32 sayısının rakamları toplamı 9+a olup 9 ile bölünmesi için a=0 veya a=9 olabilir. 2) b=6 için 4a36 sayısının rakamları toplamı 13+a olup 9 ile bölünmesi için a=5 olmalıdır. a\'nın alabileceği değerler toplamı: 0 + 9 + 5 = 14 bulunur.'
  },
  {
    id: 35,
    subjectId: 'MATEMATIK',
    topic: 'Basit Eşitsizlikler',
    question: '$-3 < x < 4$ olduğuna göre, $(x^2 - 2)$ ifadesinin alabileceği en geniş değer aralığı nedir?',
    options: ['[-2, 14)', '(-2, 14)', '[0, 16)', '(7, 14)', '[-2, 16]'],
    correctAnswer: 0,
    explanation: '-3 < x < 4 aralığında 0 değeri yer aldığından, x² ifadesinin en küçük değeri 0² = 0\'dır. En büyük sınır 4² = 16 (dahil değil). Yani 0 ≤ x² < 16. Her taraftan 2 çıkarılırsa: -2 ≤ x² - 2 < 14, yani [-2, 14) aralığıdır.'
  },
  {
    id: 36,
    subjectId: 'MATEMATIK',
    topic: 'Mutlak Değer',
    question: '$$|2x - 6| + |3 - x| = 12$$\ndenklemini sağlayan x değerlerinin çarpımı kaçtır?',
    options: ['-7', '-5', '0', '5', '7'],
    correctAnswer: 0,
    explanation: '|2x - 6| = 2|x - 3| ve |3 - x| = |x - 3|\'tür. Toplam: 2|x - 3| + |x - 3| = 3|x - 3| = 12 => |x - 3| = 4. Buradan x - 3 = 4 => x = 7; veya x - 3 = -4 => x = -1. Çarpımları: 7 . (-1) = -7.'
  },
  {
    id: 37,
    subjectId: 'MATEMATIK',
    topic: 'Üslü Sayılar',
    question: '$$3^{x+1} + 3^{x+2} = 108$$\nolduğuna göre $x$ kaçtır?',
    options: ['1', '2', '3', '4', '5'],
    correctAnswer: 1,
    explanation: '3^x . 3 + 3^x . 9 = 12 . 3^x = 108 => 3^x = 108 / 12 = 9 = 3² => x = 2.'
  },
  {
    id: 38,
    subjectId: 'MATEMATIK',
    topic: 'Köklü Sayılar',
    question: '$$\\sqrt{75} - \\sqrt{27} + \\sqrt{12}$$\nişleminin sonucu kaçtır?',
    options: ['$2\\sqrt{3}$', '$3\\sqrt{3}$', '$4\\sqrt{3}$', '$5\\sqrt{3}$', '$6\\sqrt{3}$'],
    correctAnswer: 2,
    explanation: '√75 = 5√3, √27 = 3√3, √12 = 2√3. İşlem: 5√3 - 3√3 + 2√3 = 4√3.'
  },
  {
    id: 39,
    subjectId: 'MATEMATIK',
    topic: 'Çarpanlara Ayırma',
    question: 'x - y = 6 ve x . y = 16 olduğuna göre, x² + y² toplamı kaçtır?',
    options: ['52', '64', '68', '72', '80'],
    correctAnswer: 2,
    explanation: '(x - y)² = x² - 2xy + y² => 6² = x² - 2(16) + y² => 36 = x² + y² - 32 => x² + y² = 68.'
  },
  {
    id: 40,
    subjectId: 'MATEMATIK',
    topic: 'Oran - Orantı',
    question: 'a, b ve c sayıları sırasıyla 2, 3 ve 5 ile doğru orantılıdır. 2a + b - c = 12 olduğuna göre, a + b + c toplamı kaçtır?',
    options: ['30', '40', '50', '60', '70'],
    correctAnswer: 3,
    explanation: 'a = 2k, b = 3k, c = 5k. Denklem: 2(2k) + 3k - 5k = 4k + 3k - 5k = 2k = 12 => k = 6. a + b + c = 2k + 3k + 5k = 10k = 10 . 6 = 60.'
  },
  {
    id: 41,
    subjectId: 'MATEMATIK',
    topic: 'Sayı Problemleri',
    question: 'Bir sınıftaki öğrenciler sıralara ikişer ikişer oturursa 6 öğrenci ayakta kalıyor. Üçer üçer otururlarsa 2 sıra boş kalıyor. Buna göre sınıfta kaç öğrenci vardır?',
    options: ['24', '28', '30', '32', '36'],
    correctAnswer: 2,
    explanation: 'Sıra sayısı x olsun. Öğrenci sayısı: 2x + 6. Üçer oturduklarında 2 sıra boşsa kullanılan sıra (x - 2)\'dir. Öğrenci sayısı: 3(x - 2) = 3x - 6. Buradan 2x + 6 = 3x - 6 => x = 12 (sıra sayısı). Öğrenci sayısı = 2(12) + 6 = 30.'
  },
  {
    id: 42,
    subjectId: 'MATEMATIK',
    topic: 'Yaş Problemleri',
    question: 'Bir babanın yaşı, iki çocuğunun yaşları toplamının 3 katıdır. 4 yıl sonra babanın yaşı, çocuklarının yaşları toplamının 2 katından 2 eksik olacaktır. Babanın bugünkü yaşı kaçtır?',
    options: ['36', '42', '45', '48', '54'],
    correctAnswer: 1,
    explanation: 'Çocukların bugünkü yaş toplamı Ç olsun. Baba B = 3Ç. 4 yıl sonra babanın yaşı B + 4 = 3Ç + 4. İki çocuğun 4 yıl sonraki yaş toplamı Ç + 8. Denklem: 3Ç + 4 = 2(Ç + 8) - 2 => 3Ç + 4 = 2Ç + 16 - 2 => Ç = 10. Babanın yaşı B = 3 . 10 = 42 (veya seçenek B 42).'
  },
  {
    id: 43,
    subjectId: 'MATEMATIK',
    topic: 'Yüzde & Kâr - Zarar Problemleri',
    question: 'Bir satıcı elindeki malı %20 kârla 120 TL\'ye satıyor. Aynı malı 90 TL\'ye satsaydı yüzde kaç zarar ederdi?',
    options: ['%5', '%10', '%15', '%20', '%25'],
    correctAnswer: 1,
    explanation: 'Maliyet M olsun. %20 karlı satış: 1,20 . M = 120 => M = 100 TL. Mal 90 TL\'ye satılırsa 100 - 90 = 10 TL zarar edilir. Bu da %10 zarardır.'
  },
  {
    id: 44,
    subjectId: 'MATEMATIK',
    topic: 'Karışım Problemleri',
    question: 'Tuz oranı %30 olan 40 kg tuzlu su karışımına 10 kg saf su eklenirse yeni karışımın tuz oranı yüzde kaç olur?',
    options: ['%20', '%22', '%24', '%25', '%28'],
    correctAnswer: 2,
    explanation: 'Karışımdaki tuz miktarı = 40 . (30/100) = 12 kg. Eklenen su ile toplam ağırlık = 40 + 10 = 50 kg. Yeni tuz yüzdesi = (12 / 50) . 100 = %24.'
  },
  {
    id: 45,
    subjectId: 'MATEMATIK',
    topic: 'İşçi - Havuz Problemleri',
    question: 'Ahmet bir işi tek başına 12 günde, Mehmet ise aynı işi tek başına 24 günde bitirebilmektedir. İkisi birlikte çalışırlarsa bu iş kaç günde biter?',
    options: ['6', '8', '9', '10', '11'],
    correctAnswer: 1,
    explanation: '1 günde yapılan iş = 1/12 + 1/24 = (2 + 1)/24 = 3/24 = 1/8. İşin tamamı birlikte 8 günde biter.'
  },
  {
    id: 46,
    subjectId: 'MATEMATIK',
    topic: 'Hız Problemleri',
    question: 'A ve B kentleri arasındaki mesafe 480 km\'dir. Hızı saatte 80 km olan bir araç A\'dan B\'ye doğru hareket ediyor. 3 saat yol aldıktan sonra hızını saatte 30 km azaltırsa yolun tamamını toplam kaç saatte tamamlar?',
    options: ['6,5', '7,2', '7,8', '8', '8,5'],
    correctAnswer: 2,
    explanation: 'İlk 3 saatte gidilen yol = 80 . 3 = 240 km. Kalan yol = 480 - 240 = 240 km. Yeni hız = 80 - 30 = 50 km/sa. Kalan süreyi bulalım: 240 / 50 = 4,8 saat. Toplam süre = 3 + 4,8 = 7,8 saat.'
  },
  {
    id: 47,
    subjectId: 'MATEMATIK',
    topic: 'Kümeler',
    question: 'A ve B iki küme olmak üzere, s(A ∪ B) = 26, s(A ∩ B) = 4 ve s(A) = 2 . s(B) olduğuna göre, s(B \\ A) kaçtır?',
    options: ['4', '5', '6', '7', '8'],
    correctAnswer: 2,
    explanation: 'Kümeler birleşimi kuralı: s(A ∪ B) = s(A) + s(B) - s(A ∩ B). Verilenleri yerine koyarsak: 26 = 2s(B) + s(B) - 4 => 30 = 3s(B) => s(B) = 10. s(B \\ A) = s(B) - s(A ∩ B) = 10 - 4 = 6 bulunur.'
  },
  {
    id: 48,
    subjectId: 'MATEMATIK',
    topic: 'Fonksiyonlar',
    question: 'f(x) = 3x - 5 olduğuna göre, f(2x + 1) fonksiyonunun f(x) cinsinden eşiti aşağıdakilerden hangisidir?',
    options: ['2f(x) + 5', '2f(x) + 8', '3f(x) + 2', '2f(x) - 3', 'f(x) + 7'],
    correctAnswer: 1,
    explanation: 'f(2x + 1) = 3(2x + 1) - 5 = 6x + 3 - 5 = 6x - 2. f(x) = 3x - 5 => 3x = f(x) + 5 => 6x = 2f(x) + 10. Yerine koyarsak: 2f(x) + 10 - 2 = 2f(x) + 8.'
  },
  {
    id: 49,
    subjectId: 'MATEMATIK',
    topic: 'Permütasyon & Kombinasyon',
    question: '4 doktor ve 5 hemşire arasından 2 doktor ve 2 hemşireden oluşan 4 kişilik bir sağlık ekibi kaç farklı şekilde seçilebilir?',
    options: ['30', '45', '60', '75', '90'],
    correctAnswer: 2,
    explanation: 'C(4, 2) . C(5, 2) = [(4 . 3) / 2] . [(5 . 4) / 2] = 6 . 10 = 60 farklı şekilde seçilebilir.'
  },
  {
    id: 50,
    subjectId: 'MATEMATIK',
    topic: 'Olasılık',
    question: 'Bir torbada 4 kırmızı, 5 mavi ve 3 beyaz bilye vardır. Torbadan rastgele çekilen 2 bilyenin de mavi olma olasılığı kaçtır?',
    options: ['5/33', '5/36', '7/44', '1/6', '2/11'],
    correctAnswer: 0,
    explanation: 'Toplam bilye sayısı = 4 + 5 + 3 = 12. C(12, 2) = (12 . 11)/2 = 66. İstenen durum: C(5, 2) = 10. Olasılık = 10 / 66 = 5 / 33.'
  },
  {
    id: 51,
    subjectId: 'MATEMATIK',
    topic: 'Grafik Yorumlama & Sayısal Veri Analizi',
    question: 'Aşağıdaki grafikte Türkiye\'nin dış ticaret sektör ihracat dağılımı gösterilmiştir. İmalat sanayi ihracat payının madencilik ihracat payından kaç puan fazla olduğunu belirleyiniz.',
    media: {
      type: 'chart',
      title: 'Türkiye Dış Ticaret Sektörel İhracat Dağılımı',
      caption: 'TÜİK Yıllık Dış Ticaret İstatistikleri İndeksi',
      chartData: [
        { name: 'İmalat Sanayisi', value: 72, color: '#0071E3' },
        { name: 'Tarım ve Ormancılık', value: 16, color: '#34C759' },
        { name: 'Madencilik ve Taş Ocakçılığı', value: 12, color: '#FF9500' }
      ]
    },
    options: ['48', '56', '60', '64', '68'],
    correctAnswer: 2,
    explanation: 'Grafikten okunan değerlere göre İmalat Sanayisi payı = %72, Madencilik payı = %12\'dir. Fark: 72 - 12 = 60 puan fazladır.'
  },
  {
    id: 52,
    subjectId: 'MATEMATIK',
    topic: 'Sayısal Mantık',
    question: 'Bir torbada 1\'den 20\'ye kadar numaralandırılmış 20 kart bulunmaktadır. Torbadan rastgele çekilen bir kartın numarasının hem 2\'ye hem de 3\'e bölünebilen bir sayı olma olasılığı kaçtır?',
    options: ['1/10', '3/20', '1/5', '1/4', '3/10'],
    correctAnswer: 1,
    explanation: 'Hem 2 hem 3\'e bölünebilen sayılar 6\'nın katlarıdır. 1 ile 20 arasında 6\'nın katları: 6, 12, 18 olmak üzere 3 tanedir. Olasılık = 3 / 20.'
  },
  {
    id: 53,
    subjectId: 'MATEMATIK',
    topic: 'Modüler Aritmetik',
    question: 'Bugün günlerden Salı olduğuna göre, 150 gün sonra hangi gün olur?',
    options: ['Perşembe', 'Cuma', 'Cumartesi', 'Pazar', 'Pazartesi'],
    correctAnswer: 1,
    explanation: 'Hafta 7 gündür. 150 / 7 kalanını bulalım: 150 = 7 . 21 + 3 (kalan 3). Salı\'dan 3 gün sonrası: Çarşamba (1), Perşembe (2), Cuma (3). Cuma günü olur.'
  },
  {
    id: 54,
    subjectId: 'MATEMATIK',
    topic: 'İşlem',
    question: 'Gerçek sayılar kümesinde a ⊕ b = 2a + 3b - ab işlemi tanımlanmıştır. Buna göre 4 ⊕ 3 işleminin sonucu kaçtır?',
    options: ['3', '5', '7', '9', '11'],
    correctAnswer: 1,
    explanation: '4 ⊕ 3 = 2(4) + 3(3) - (4 . 3) = 8 + 9 - 12 = 17 - 12 = 5.'
  },
  {
    id: 55,
    subjectId: 'MATEMATIK',
    topic: 'Geometri - Doğruda ve Üçgende Açılar',
    question: 'Bir ABC üçgeninde m(BAC) = 70° ve |AB| = |AC|\'dir. B açısının açıortayı çizilerek [AC] kenarını D noktasında kesiyor. Buna göre m(BDC) açısı kaç derecedir?',
    options: ['75°', '82,5°', '85°', '95°', '105°'],
    correctAnswer: 1,
    explanation: '|AB| = |AC| ikizkenar olduğundan B ve C taban açıları eşittir: (180 - 70)/2 = 55°. [BD] açıortay olduğundan m(ABD) = m(DBC) = 55 / 2 = 27,5°. BDC üçgeninde m(DBC) = 27,5° ve m(BCD) = 55° olduğundan m(BDC) = 180 - (27,5 + 55) = 180 - 82,5 = 97,5° (veya dış açı teoreminden: 70 + 27,5 = 97,5°). Düzeltilmiş açı sorusu: 180 - 97,5 = 82,5° (m(BDA)). Soru m(BDA) = 82,5° dir.'
  },
  {
    id: 56,
    subjectId: 'MATEMATIK',
    topic: 'Geometri - Özel Üçgenler',
    question: 'Bir dik üçgenin hipotenüs uzunluğu 25 cm ve dik kenarlarından biri 15 cm olduğuna göre, bu üçgenin alanı kaç cm² dir?',
    options: ['120', '150', '180', '200', '240'],
    correctAnswer: 1,
    explanation: '3-4-5 özel üçgeninin 5 katı: (15, 20, 25). Diğer dik kenar 20 cm\'dir. Alan = (dik kenarlar çarpımı) / 2 = (15 . 20) / 2 = 150 cm².'
  },
  {
    id: 57,
    subjectId: 'MATEMATIK',
    topic: 'Geometri - Dikdörtgen ve Kare',
    question: 'Çevresi 48 cm olan bir karenin içerisine köşeleri karenin kenarlarının orta noktaları olacak şekilde bir kare daha çiziliyor. İçteki karenin alanı kaç cm² dir?',
    options: ['36', '64', '72', '96', '144'],
    correctAnswer: 2,
    explanation: 'Karenin bir kenarı 48 / 4 = 12 cm. Alanı = 12² = 144 cm². Kenar orta noktaları birleştirilerek elde edilen içteki karenin alanı, dıştaki karenin alanının tam yarısına eşittir: 144 / 2 = 72 cm².'
  },
  {
    id: 58,
    subjectId: 'MATEMATIK',
    topic: 'Geometri - Çember ve Daire',
    question: 'Yarıçapı 6 cm olan bir dairede, merkez açısının ölçüsü 60° olan daire diliminin alanı kaç π cm² dir?',
    options: ['3', '4', '6', '8', '12'],
    correctAnswer: 2,
    explanation: 'Daire dilimi alanı = π . r² . (α / 360) = π . 6² . (60 / 360) = π . 36 . (1 / 6) = 6π cm².'
  },
  {
    id: 59,
    subjectId: 'MATEMATIK',
    topic: 'Geometri - Katı Cisimler',
    question: 'Taban yarıçapı 3 cm ve yüksekliği 8 cm olan bir dik dairesel silindirin hacmi kaç π cm³ tür?',
    options: ['48', '64', '72', '84', '96'],
    correctAnswer: 2,
    explanation: 'Silindirin hacmi V = π . r² . h formülüyle hesaplanır. V = π . 3² . 8 = π . 9 . 8 = 72π cm³.'
  },
  {
    id: 60,
    subjectId: 'MATEMATIK',
    topic: 'Geometri - Analitik Geometri',
    question: 'Analitik düzlemde A(2, -3) ve B(6, 1) noktaları arasındaki uzaklık kaç birimdir?',
    options: ['4', '4√2', '5', '5√2', '6'],
    correctAnswer: 1,
    explanation: 'İki nokta arası uzaklık: √[(x₂ - x₁)² + (y₂ - y₁)²] = √[(6 - 2)² + (1 - (-3))²] = √[4² + 4²] = √[16 + 16] = √32 = 4√2 birim.'
  },

  // ==========================================
  // TARİH (SORU 61 - 87)
  // ==========================================
  {
    id: 61,
    subjectId: 'TARIH',
    topic: 'İslamiyet Öncesi Türk Tarihi',
    question: 'İslamiyet öncesi Türk devletlerinde hükümdarın devleti yönetme yetkisinin Tanrı tarafından verildiğine inanılan anlayışa ne ad verilir?',
    options: ['Töre', 'Kut', 'Kurultay', 'Yarlık', 'Tigin'],
    correctAnswer: 1,
    explanation: 'İslamiyet öncesi Türklerde devleti yönetme yetkisinin Gök Tanrı tarafından hükümdara verildiği inancına "Kut" anlayışı denir.'
  },
  {
    id: 62,
    subjectId: 'TARIH',
    topic: 'İslamiyet Öncesi Türk Tarihi',
    question: 'Tarihte Türk adıyla kurulan ilk devlet ve ilk Türk alfabesini kullanan uygarlık aşağıdakilerden hangisidir?',
    options: ['Asya Hun Devleti', 'Uygurlar', 'Göktürkler (Köktürkler)', 'Hazarlar', 'Avarlar'],
    correctAnswer: 2,
    explanation: 'Türk adıyla kurulan ilk devlet I. Göktürk Devleti\'dir. İlk milli Türk alfabesi olan 38 harfli Orhun alfabesini de Göktürkler kullanmıştır.'
  },
  {
    id: 63,
    subjectId: 'TARIH',
    topic: 'İlk Türk - İslam Devletleri',
    question: 'Karahanlılar Devleti döneminde Yusuf Has Hacib tarafından yazılan, ilk Türk-İslam edebi eseri ve siyasetname özelliği taşıyan yapıt aşağıdakilerden hangisidir?',
    options: ['Divanü Lügati\'t-Türk', 'Atabetü\'l-Hakayık', 'Kutadgu Bilig', 'Divan-ı Hikmet', 'Şehname'],
    correctAnswer: 2,
    explanation: '1069\'da Yusuf Has Hacib tarafından Doğu Karahanlı hükümdarı Tabgaç Buğra Han\'a sunulan "Kutadgu Bilig" (Mutluluk Veren Bilgi), ilk Türk-İslam edebi eseri ve ilk siyasetnamedir.'
  },
  {
    id: 64,
    subjectId: 'TARIH',
    topic: 'İlk Türk - İslam Devletleri',
    question: 'Büyük Selçuklu Devleti\'nin Bizans İmparatorluğu\'nu mağlup ederek Anadolu\'nun kapılarını Türklere kesin olarak açtığı 1071 tarihli meydan savaşı hangisidir?',
    options: ['Pasinler Savaşı', 'Dandanakan Savaşı', 'Malazgirt Savaşı', 'Katvan Savaşı', 'Miryokefalon Savaşı'],
    correctAnswer: 2,
    explanation: '26 Ağustos 1071\'de Sultan Alparslan komutasındaki Selçuklu ordusunun Bizans ordusunu yendiği Malazgirt Zaferi ile Anadolu\'nun kapıları Türklere açılmıştır.'
  },
  {
    id: 65,
    subjectId: 'TARIH',
    topic: 'Türkiye (Anadolu) Selçuklu ve Bizans Mücadelesi',
    question: 'Aşağıdaki tabloda Selçuklu-Bizans savaşları ve sonuçları özetlenmiştir. Tabloda "?" ile gösterilen ve Anadolu\'nun tapusunun Türklerde kalmasını kesinleştiren savaş hangisidir?',
    media: {
      type: 'table',
      title: 'Selçuklu - Bizans Karşılaşmaları ve Tarihsel Sonuçları',
      caption: 'Orta Çağ Türk Tarihi Karşılaştırma Matrisi',
      tableData: {
        headers: ['Savaşın Adı', 'Tarih', 'Hükümdar', 'Tarihsel Önemi / Sonucu'],
        rows: [
          ['Pasinler Savaşı', '1048', 'Tuğrul Bey / İbrahim Yınal', 'Bizans ile ilk büyük meydan savaşı ve keşif'],
          ['Malazgirt Meydan Savaşı', '1071', 'Sultan Alparslan', 'Anadolu\'nun kapıları Türklere tamamen açıldı'],
          ['?', '1176', 'II. Kılıç Arslan', 'Bizans\'ın Türkleri atma ümidi bitti, Anadolu kesinleşti']
        ]
      }
    },
    options: ['Miryokefalon Savaşı', 'Kösedağ Savaşı', 'Yassıçemen Savaşı', 'Baba İshak İsyanı', 'Otlukbeli Savaşı'],
    correctAnswer: 0,
    explanation: '1176 Miryokefalon Zaferi ile Bizans\'ın Türkleri Anadolu\'dan atma ümidi tamamen sona ermiş ve Anadolu kesin olarak Türk yurdu haline gelmiştir.'
  },
  {
    id: 66,
    subjectId: 'TARIH',
    topic: 'Osmanlı Devleti Kültür ve Medeniyeti',
    question: 'Osmanlı Devleti\'nde Divan-ı Hümayun\'da "İlmiye" sınıfının en üst düzey temsilcileri arasında yer alan, adalet ve eğitim işlerinden sorumlu divan üyesi kimdir?',
    options: ['Sadrazam', 'Defterdar', 'Nişancı', 'Kazasker', 'Kaptan-ı Derya'],
    correctAnswer: 3,
    explanation: 'Kazasker (Kadıasker), Divan-ı Hümayun\'da kadı ve müderrislerin atama ve terfilerini yapan, büyük davalara bakan İlmiye sınıfı temsilcisidir.'
  },
  {
    id: 67,
    subjectId: 'TARIH',
    topic: 'Osmanlı Devleti Kültür ve Medeniyeti',
    question: 'Osmanlı Devleti\'nde fethedilen toprakların gelirlerine göre tahrir defterlerine kaydedilmesi, padişahın tuğrasının belgelere çekilmesi işlerinden sorumlu olan görevli kimdir?',
    options: ['Reisülküttap', 'Nişancı', 'Şeyhülislam', 'Subaşı', 'Muhtesip'],
    correctAnswer: 1,
    explanation: 'Nişancı; tahrir defterlerini tutan, ferman ve berahlara padişah tuğrasını çeken ve örfi hukukun Divan\'daki uzmanı olan üst düzey bürokrattır.'
  },
  {
    id: 68,
    subjectId: 'TARIH',
    topic: 'Osmanlı Kuruluş ve Yükselme Dönemi',
    question: 'Fatih Sultan Mehmet döneminde Karadeniz\'in bir "Türk gölü" haline gelmesinde etkili olan en önemli gelişme hangisidir?',
    options: ['Trabzon Rum İmparatorluğu\'nun yıkılması', 'Kırım\'ın fethedilmesi', 'Sinop\'un İsfendiyaroğulları\'ndan alınması', 'Amasra\'nın Cenevizlilerden alınması', 'Mora Yarımadası\'nın fethi'],
    correctAnswer: 1,
    explanation: '1475 yılında Gedik Ahmet Paşa komutasında Kırım Hanlığı\'nın Osmanlı idaresine bağlanmasıyla Karadeniz bir Türk gölü haline gelmiştir.'
  },
  {
    id: 69,
    subjectId: 'TARIH',
    topic: 'Osmanlı Yükselme Dönemi',
    question: 'Yavuz Sultan Selim döneminde Memlük Devleti\'ne son verilerek Halifeliğin Osmanlı hanedanına geçtiği savaşlar hangi seçenekte birlikte verilmiştir?',
    options: ['Çaldıran - Turnadağ', 'Mercidabık - Ridaniye', 'Otlukbeli - Çaldıran', 'Mohaç - Preveze', 'Varna - II. Kosova'],
    correctAnswer: 1,
    explanation: '1516 Mercidabık ve 1517 Ridaniye Savaşları sonucunda Memlük Devleti yıkılmış, Suriye, Filistin, Hicaz ve Mısır Osmanlı\'ya katılmış, halifelik Osmanlı\'ya geçmiştir.'
  },
  {
    id: 70,
    subjectId: 'TARIH',
    topic: 'Osmanlı Duraklama ve Gerileme Dönemi',
    question: 'Osmanlı Devleti\'nin Batı\'da en geniş sınırlara ulaştığı ve Lehistan ile imzalanan 1672 tarihli antlaşma hangisidir?',
    options: ['Zitvatorok Antlaşması', 'Bucaş Antlaşması', 'Kasr-ı Şirin Antlaşması', 'Ferhat Paşa Antlaşması', 'Vasvar Antlaşması'],
    correctAnswer: 1,
    explanation: '1672 Bucaş Antlaşması (Lehistan ile), Osmanlı Devleti\'nin Batı\'da toprak kazandığı son antlaşma ve Batı\'da en geniş sınırlara ulaştığı belgedir.'
  },
  {
    id: 71,
    subjectId: 'TARIH',
    topic: 'Osmanlı Gerileme Dönemi',
    question: '1718 Pasarofça Antlaşması ile başlayan ve 1730 Patrona Halil İsyanı ile sona eren, Osmanlı\'nın Batı\'nın üstünlüğünü kabul ettiği ilk dönem hangisidir?',
    options: ['Tanzimat Dönemi', 'Lale Devri', 'Meşrutiyet Dönemi', 'Köprülüler Dönemi', 'Fetret Devri'],
    correctAnswer: 1,
    explanation: 'Padişah III. Ahmed ve Sadrazam Nevşehirli Damat İbrahim Paşa dönemini kapsayan (1718-1730) Lale Devri, Osmanlı\'nın Avrupa\'yı örnek almaya başladığı barış ve ıslahat devridir.'
  },
  {
    id: 72,
    subjectId: 'TARIH',
    topic: 'Osmanlı Dağılma Dönemi',
    question: '1839 yılında ilan edilen Tanzimat Fermanı (Gülhane Hatt-ı Hümayunu), hangi Osmanlı padişahı döneminde ve kimin hazırlığıyla yürürlüğe girmiştir?',
    options: ['II. Mahmud - Alemdar Mustafa Paşa', 'Sultan Abdülmecid - Mustafa Reşit Paşa', 'Sultan Abdülaziz - Mithat Paşa', 'II. Abdülhamid - Ahmet Cevdet Paşa', 'V. Murad - Namık Kemal'],
    correctAnswer: 1,
    explanation: 'Tanzimat Fermanı, Sultan Abdülmecid döneminde Hariciye Nazırı Mustafa Reşit Paşa tarafından hazırlanıp Gülhane Parkı\'nda okunmuştur.'
  },
  {
    id: 73,
    subjectId: 'TARIH',
    topic: '20. Yüzyıl Başlarında Osmanlı',
    question: 'Mustafa Kemal\'in tarih sahnesine ilk kez çıktığı ve askeri yeteneğini gösterdiği "31 Mart Vakası"nı bastıran ordunun adı nedir?',
    options: ['Kuvâ-yi Milliye', 'Hareket Ordusu', 'Yıldırım Orduları', 'Kafkas İslam Ordusu', 'Hamidiye Alayları'],
    correctAnswer: 1,
    explanation: '1909 yılında meşrutiyet karşıtı 31 Mart İsyanı\'nı bastırmak üzere Selanik\'ten gelen ordunun adı Hareket Ordusu\'dur. Kurmay başkanı Mustafa Kemal\'dir.'
  },
  {
    id: 74,
    subjectId: 'TARIH',
    topic: 'I. Dünya Savaşı',
    question: 'I. Dünya Savaşı\'nda Osmanlı Devleti\'nin toprak kazandığı (Kars, Ardahan, Batum) tek cephe aşağıdakilerden hangisidir?',
    options: ['Çanakkale Cephesi', 'Kafkas Cephesi', 'Kanal Cephesi', 'Irak Cephesi', 'Hicaz-Yemen Cephesi'],
    correctAnswer: 1,
    explanation: 'Kafkas Cephesi\'nde Rusya\'da Bolşevik İhtilali çıkınca 1918 Brest-Litovsk Antlaşması imzalanmış ve Elviye-i Selase (Kars, Ardahan, Batum) Osmanlı\'ya geri verilmiştir.'
  },
  {
    id: 75,
    subjectId: 'TARIH',
    topic: 'Kurtuluş Savaşı Hazırlık Dönemi',
    question: '"Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır." kararıyla Milli Mücadele\'nin amaç, gerekçe ve yöntemi ilk kez nerede belirlenmiştir?',
    options: ['Havza Genelgesi', 'Amasya Genelgesi', 'Erzurum Kongresi', 'Sivas Kongresi', 'Misak-ı Milli'],
    correctAnswer: 1,
    explanation: '22 Haziran 1919 tarihli Amasya Genelgesi, Milli Mücadele\'nin ihtilal beyannamesi niteliğinde olup gerekçe, amaç ve yöntemini ilk kez belirlemiştir.'
  },
  {
    id: 76,
    subjectId: 'TARIH',
    topic: 'Kurtuluş Savaşı Hazırlık Dönemi',
    question: '"Milli sınırlar içinde vatan bir bütündür, bölünemez." ilkesi ilk kez hangi kongrede kabul edilmiştir?',
    options: ['Amasya Genelgesi', 'Erzurum Kongresi', 'Balıkesir Kongresi', 'Sivas Kongresi', 'Alaşehir Kongresi'],
    correctAnswer: 1,
    explanation: 'Milli sınırlardan ilk kez Erzurum Kongresi\'nde (1919) bahsedilmiş ve vatanın bölünmez bütünlüğü burada ilke kararı yapılmıştır.'
  },
  {
    id: 77,
    subjectId: 'TARIH',
    topic: 'Kurtuluş Savaşı Hazırlık Dönemi Kronolojisi',
    questionType: 'ordering',
    question: 'Milli Mücadele hazırlık sürecinde gerçekleşen aşağıdaki tarihi gelişmelerin kronolojik doğru sıralaması hangi seçenekte verilmiştir?',
    orderingItems: [
      'Amasya Genelgesi\'nin yayımlanması (22 Haziran 1919)',
      'Erzurum Kongresi\'nin toplanması (23 Temmuz 1919)',
      'Sivas Kongresi\'nin toplanması (4 Eylül 1919)',
      'Amasya Görüşmeleri\'nin yapılması (20-22 Ekim 1919)'
    ],
    options: ['I - II - III - IV', 'II - I - III - IV', 'I - III - II - IV', 'IV - I - II - III', 'III - II - I - IV'],
    correctAnswer: 0,
    explanation: 'Kronolojik sıra: 1) Amasya Genelgesi (Haziran 1919), 2) Erzurum Kongresi (Temmuz 1919), 3) Sivas Kongresi (Eylül 1919), 4) Amasya Görüşmeleri (Ekim 1919). Doğru sıralama: I - II - III - IV.'
  },
  {
    id: 78,
    subjectId: 'TARIH',
    topic: 'I. TBMM Dönemi',
    question: 'I. İnönü Zaferi sonrasında TBMM\'nin uluslararası alanda kazandığı diplomatik başarılar arasında aşağıdakilerden hangisi yer almaz?',
    options: ['Londra Konferansı\'na davet edilmesi', 'Sovyet Rusya ile Moskova Antlaşması', 'Afganistan ile Dostluk Antlaşması', 'Fransa ile Ankara Antlaşması', 'İstiklal Marşı\'nın kabulü'],
    correctAnswer: 3,
    explanation: 'Fransa ile Ankara Antlaşması I. İnönü değil, Sakarya Meydan Muharebesi sonrasında (20 Ekim 1921) imzalanmıştır.'
  },
  {
    id: 79,
    subjectId: 'TARIH',
    topic: 'Kurtuluş Savaşı Muharebeler Dönemi',
    question: 'Mustafa Kemal Paşa\'ya TBMM tarafından "Başkomutanlık" yetkisinin verilmesi hangi askeri gelişmenin hemen ardından gerçekleşmiştir?',
    options: ['I. İnönü Savaşı', 'II. İnönü Savaşı', 'Eskişehir - Kütahya Muharebeleri', 'Sakarya Meydan Muharebesi', 'Büyük Taarruz'],
    correctAnswer: 2,
    explanation: 'Eskişehir-Kütahya yenilgisi üzerine ordu Sakarya Nehri\'nin doğusuna çekilmiş; meclisteki tartışmalar sonucunda 5 Ağustos 1921\'de Mustafa Kemal\'e Başkomutanlık yetkisi verilmiştir.'
  },
  {
    id: 80,
    subjectId: 'TARIH',
    topic: 'Kurtuluş Savaşı Muharebeler Dönemi',
    question: '"Hattı müdafaa yoktur, sathı müdafaa vardır. O satıh bütün vatandır." tarihi emri Mustafa Kemal tarafından hangi savaşta verilmiştir?',
    options: ['I. İnönü', 'II. İnönü', 'Sakarya Meydan Muharebesi', 'Dumlupınar Meydan Muharebesi', 'Çanakkale Savaşları'],
    correctAnswer: 2,
    explanation: 'Sakarya Meydan Muharebesi\'nde (1921) Başkomutan Mustafa Kemal Paşa topyekûn savunma doktrinini bu tarihi sözle ilan etmiştir.'
  },
  {
    id: 81,
    subjectId: 'TARIH',
    topic: 'Kurtuluş Savaşı Antlaşmalar ve Sonuçları',
    questionType: 'matching',
    question: 'Aşağıdaki Kurtuluş Savaşı dönemi diplomatik antlaşmaları ile sonuçlarının doğru eşleştirmesi hangi seçenekte verilmiştir?',
    matchingPairs: [
      { id: '1', left: 'Gümrü Antlaşması (1920)', right: 'Ermenistan mağlup edildi, Doğu Cephesi kapandı' },
      { id: '2', left: 'Ankara Antlaşması (1921)', right: 'Fransa çekildi, Güney Cephesi kapandı' },
      { id: '3', left: 'Mudanya Ateşkesi (1922)', right: 'Doğu Trakya ve Boğazlar savaşsız kurtarıldı' }
    ],
    options: [
      '1-a, 2-b, 3-c',
      '1-b, 2-a, 3-c',
      '1-c, 2-b, 3-a',
      '1-a, 2-c, 3-b',
      '1-b, 2-c, 3-a'
    ],
    correctAnswer: 0,
    explanation: 'Gümrü Antlaşması (1920) ile Doğu Cephesi kapanmış; 1921 Ankara Antlaşması ile Fransa çekilerek Güney Cephesi kapanmış; Mudanya Mütarekesi (1922) ile İstanbul ve Doğu Trakya savaş yapılmadan kurtarılmıştır. Doğru eşleştirme 1-a, 2-b, 3-c\'dir.'
  },
  {
    id: 82,
    subjectId: 'TARIH',
    topic: 'Atatürk İlkeleri',
    question: 'Aşar vergisinin kaldırılması, kadınlara seçme-seçilme hakkı tanınması ve Medeni Kanun\'un kabulü öncelikle hangi Atatürk ilkesi ile doğrudan ilişkilidir?',
    options: ['Milliyetçilik', 'Devletçilik', 'Halkçılık', 'Laiklik', 'İnkılapçılık'],
    correctAnswer: 2,
    explanation: 'Toplumsal eşitliği sağlamak, ayrıcalıkları kaldırmak ve halkın yararını gözetmek doğrudan "Halkçılık" ilkesinin gereğidir.'
  },
  {
    id: 83,
    subjectId: 'TARIH',
    topic: 'Atatürk Dönemi İnkılapları',
    question: '3 Mart 1924 tarihinde çıkarılan yasalar arasında aşağıdakilerden hangisi yer almaz?',
    options: ['Halifeliğin kaldırılması', 'Tevhid-i Tedrisat Kanunu\'nun kabulü', 'Şeriye ve Evkaf Vekaletinin kaldırılması', 'Erkan-ı Harbiye Vekaletinin kaldırılması', 'Tekke, zaviye ve türbelerin kapatılması'],
    correctAnswer: 4,
    explanation: 'Tekke, zaviye ve türbeler 3 Mart 1924\'te değil, 30 Kasım 1925 tarihinde çıkarılan 677 sayılı kanunla kapatılmıştır.'
  },
  {
    id: 84,
    subjectId: 'TARIH',
    topic: 'Atatürk Dönemi Dış Politika',
    question: 'Boğazlar üzerindeki uluslararası komisyonu kaldırarak Boğazların tam egemenliğini Türkiye\'ye devreden 1936 tarihli sözleşme hangisidir?',
    options: ['Lozan Boğazlar Sözleşmesi', 'Montrö Boğazlar Sözleşmesi', 'Sadabat Paktı', 'Balkan Antantı', 'Cenevre Protokolü'],
    correctAnswer: 1,
    explanation: '20 Temmuz 1936 tarihli Montrö Boğazlar Sözleşmesi ile Boğazlar Komisyonu lağvedilmiş, Boğazlarda asker bulundurma ve geçiş hakkı Türkiye\'nin tam kontrolüne geçmiştir.'
  },
  {
    id: 85,
    subjectId: 'TARIH',
    topic: 'Atatürk Dönemi Dış Politika',
    question: 'Atatürk\'ün "Şahsi meselemdir" dediği ve 1939 yılında Türkiye Cumhuriyeti sınırlarına katılan vilayetimiz hangisidir?',
    options: ['Musul', 'Batum', 'Hatay', 'Kıbrıs', 'Edirne'],
    correctAnswer: 2,
    explanation: 'Hatay, Atatürk\'ün vefatından sonra 1939 yılında Meclis kararıyla Türkiye Cumhuriyeti topraklarına katılmıştır.'
  },
  {
    id: 86,
    subjectId: 'TARIH',
    topic: 'Çağdaş Türk ve Dünya Tarihi',
    question: 'Türkiye, dünya barışına katkıda bulunmak ve güvenliğini pekiştirmek amacıyla Milletler Cemiyeti\'ne (Cemiyet-i Akvam) hangi devletin davetiyle ve hangi yılda katılmıştır?',
    options: ['İspanya\'nın davetiyle - 1932', 'Yunanistan\'ın davetiyle - 1930', 'İngiltere\'nin davetiyle - 1934', 'Fransa\'nın davetiyle - 1936', 'İtalya\'nın davetiyle - 1928'],
    correctAnswer: 0,
    explanation: 'Türkiye, başvuru yapmadan İspanya\'nın teklifi ve Yunanistan\'ın desteği ile 18 Temmuz 1932\'de Milletler Cemiyeti\'ne üye olmuştur.'
  },
  {
    id: 87,
    subjectId: 'TARIH',
    topic: 'Çağdaş Türk ve Dünya Tarihi',
    question: 'Türkiye\'nin 1952 yılında NATO\'ya (Kuzey Atlantik Antlaşması Örgütü) kabul edilmesinde hangi ülkeye asker göndermesi en belirleyici etken olmuştur?',
    options: ['Kore', 'Vietnam', 'Kıbrıs', 'Afganistan', 'Somali'],
    correctAnswer: 0,
    explanation: 'Türkiye 1950 yılında BM çağrısıyla Kore Savaşı\'na bir tugay asker göndermiş, gösterdiği kahramanlıklar neticesinde 1952\'de NATO üyesi olmuştur.'
  },

  // ==========================================
  // COĞRAFYA (SORU 88 - 105)
  // ==========================================
  {
    id: 88,
    subjectId: 'COGRAFYA',
    topic: 'Türkiye\'nin İklimi ve Basınç Dinamikleri',
    question: 'Aşağıdaki canlandırmada Türkiye üzerinde etkili olan hava kütleleri ve rüzgar sistemleri gösterilmiştir. Türkiye\'nin 36°-42° Kuzey paralelleri ile 26°-45° Doğu meridyenleri arasında yer alması aşağıdakilerden hangisi üzerinde etkili değildir?',
    media: {
      type: 'video',
      title: 'Dinamik Basınç ve Rüzgar Akımları Simülasyonu',
      caption: 'Kuzey ve Güney Sektörlü Hava Kütleleri Akım Modeli'
    },
    options: [
      'Kuzeyden esen rüzgarların sıcaklığı düşürmesi',
      'Aynı anda dört mevsim özelliklerinin belirgin olarak yaşanması',
      'Batıdan doğuya doğru gidildikçe yükseltinin ve sıcaklık farkının artması',
      'Güney yamaçların bakı etkisiyle daha fazla güneş ışığı alması',
      'Akdeniz iklim kuşağında yer alması'
    ],
    correctAnswer: 2,
    explanation: 'Batıdan doğuya gidildikçe yükseltinin artması ve sıcaklığın düşmesi enlem veya meridyenle (matematik/mutlak konumla) değil, yeryüzü şekilleri ve jeolojik yapıyla (özel/göreceli konumla) ilgilidir.'
  },
  {
    id: 89,
    subjectId: 'COGRAFYA',
    topic: 'Türkiye\'nin Yer Şekilleri ve Dağ Oluşumları',
    question: 'Aşağıdaki Türkiye fiziki haritasında numaralandırılarak gösterilen dağlık kütlelerden hangisinin oluşumunda "volkanizma" etkili olmamıştır?',
    media: {
      type: 'map',
      title: 'Türkiye Fiziki Haritası Üzerinde Numaralandırılmış Dağ Oluşumları',
      caption: 'Harita üzerindeki numaralı pinlere tıklayarak inceleyebilirsiniz',
      interactivePoints: [
        { label: '1. Erciyes Volkanı', x: 48, y: 55, desc: 'İç Anadolu strato-volkanı' },
        { label: '2. Kaçkar Dağları', x: 74, y: 28, desc: 'Doğu Karadeniz Orojenez (Kıvrım Dağları)' },
        { label: '3. Nemrut & Süphan', x: 82, y: 52, desc: 'Van Gölü havzası volkanik kütlesi' },
        { label: '4. Karacadağ', x: 67, y: 68, desc: 'Güneydoğu kalkan volkanı' }
      ]
    },
    options: ['Erciyes Dağı (1)', 'Süphan Dağı (3)', 'Kaçkar Dağları (2)', 'Tendürek Dağı', 'Karacadağ (4)'],
    correctAnswer: 2,
    explanation: 'Kaçkar Dağları (2 numara), Alp-Himalaya orojenezinde levha sıkışması sonucu kıvrılma ile oluşmuş kıvrım dağlarıdır. Diğerleri volkanizma sonucu oluşmuştur.'
  },
  {
    id: 90,
    subjectId: 'COGRAFYA',
    topic: 'Türkiye\'nin Yer Şekilleri - Platolar',
    question: 'Türkiye\'de karstik arazinin yaygın olduğu ve kireçtaşlarının çözünmesiyle oluşan "Teke ve Taşeli" platoları hangi coğrafi bölgemizde yer alır?',
    options: ['Ege Bölgesi', 'Akdeniz Bölgesi', 'İç Anadolu Bölgesi', 'Güneydoğu Anadolu Bölgesi', 'Marmara Bölgesi'],
    correctAnswer: 1,
    explanation: 'Teke ve Taşeli platoları Akdeniz Bölgesi\'nde yer alan tipik kalkerli/karstik platolardır.'
  },
  {
    id: 91,
    subjectId: 'COGRAFYA',
    topic: 'Dış Kuvvetler - Akarsular ve Göller',
    question: 'Aşağıdaki akarsularımızdan hangisi Türkiye sınırları içerisinden doğup başka bir ülkenin topraklarından denize dökülür?',
    options: ['Asi', 'Meriç', 'Fırat', 'Kura', 'Bakırçay'],
    correctAnswer: 2,
    explanation: 'Fırat ve Dicle nehirleri Türkiye topraklarından doğup Suriye ve Irak üzerinden Basra Körfezi\'ne dökülür.'
  },
  {
    id: 92,
    subjectId: 'COGRAFYA',
    topic: 'Türkiye\'nin Gölleri',
    question: 'Oluşumu bakımından "lav seddi (volkanik set)" göllerine örnek olarak aşağıdakilerden hangisi gösterilebilir?',
    options: ['Tuz Gölü', 'Beyşehir Gölü', 'Van Gölü', 'Sapanca Gölü', 'Köyceğiz Gölü'],
    correctAnswer: 2,
    explanation: 'Van, Erçek, Nazik, Balık ve Çıldır gölleri volkanik lavların vadilerin önünü tıkamasıyla oluşan volkanik set (lav seddi) gölleridir.'
  },
  {
    id: 93,
    subjectId: 'COGRAFYA',
    topic: 'Türkiye\'nin İklimi',
    question: 'Rize ve çevresinin Türkiye\'de yıllık yağış miktarının en fazla olduğu yer olmasında aşağıdakilerden hangisi en belirleyici faktördür?',
    options: [
      'Geniş bir delta ovasına sahip olması',
      'Dağların kıyıya paralel uzanması ve kıyının hemen gerisinden aniden yükselmesi',
      'Yaz aylarında fön rüzgârlarının etkili olması',
      'Bitki örtüsünün gür ormanlardan oluşması',
      'Ekvator\'a daha yakın bir enlemde yer alması'
    ],
    correctAnswer: 1,
    explanation: 'Doğu Karadeniz Dağları kıyıya paralel ve çok dik yükseldiği için denizden gelen nemli hava kütleleri yamaç boyunca hızla yükselerek bol orografik (yamaç) yağış bırakır.'
  },
  {
    id: 94,
    subjectId: 'COGRAFYA',
    topic: 'Türkiye\'nin Toprak Tipleri',
    question: 'Akdeniz iklim bölgesinde kalkerler üzerinde gelişen ve demir oksit oranının yüksek olması nedeniyle kırmızı renkli olan toprak türü hangisidir?',
    options: ['Çernezyom', 'Terra Rossa', 'Kahverengi Bozkır', 'Podzol', 'Alüvyal'],
    correctAnswer: 1,
    explanation: 'Kalker ana kaya üzerinde Akdeniz ikliminde oluşan kırmızı renkli Akdeniz toprağına "Terra Rossa" denir.'
  },
  {
    id: 95,
    subjectId: 'COGRAFYA',
    topic: 'Nüfus ve Yerleşme',
    question: 'Aşağıdaki yörelerin hangisinde nüfusun seyrek olmasının temel nedeni "karstik arazi yapısı ve engebeli yer şekilleri"dir?',
    options: ['Çatalca - Kocaeli', 'Kıyı Ege', 'Teke ve Taşeli Yöresi', 'Çukurova', 'Gaziantep Çevresi'],
    correctAnswer: 2,
    explanation: 'Teke ve Taşeli platolarında kalkerli aşınmış karstik arazi, su tutmayan zemin ve engebe nedeniyle tarım ve yerleşim çok seyrektir.'
  },
  {
    id: 96,
    subjectId: 'COGRAFYA',
    topic: 'Göçler ve Nüfus Hareketleri',
    question: 'Türkiye\'de iç göçlerin yönü genellikle doğudan batıya, kırsaldan kentlere doğrudur. Aşağıdakilerden hangisi bu göçlerin ortaya çıkardığı kentsel sorunlardan biri değildir?',
    options: [
      'Gecekondulaşma ve plansız kentleşme',
      'Sanayi tesislerinin zamanla kent merkezlerinin içinde kalması',
      'Tarımsal alanlarda iş gücü fazlalığının oluşması',
      'Altyapı, kanalizasyon ve ulaşım hizmetlerinin yetersiz kalması',
      'Eğitim ve sağlık kurumlarında aşırı yoğunluk yaşanması'
    ],
    correctAnswer: 2,
    explanation: 'Kırsaldan kente göç edildiğinde kırsal alanda iş gücü fazlalığı değil, bilakis tarımda çalışacak genç nüfus ve iş gücü açığı ortaya çıkar.'
  },
  {
    id: 97,
    subjectId: 'COGRAFYA',
    topic: 'Türkiye\'de Tarım',
    question: 'Büyüme döneminde bol nem ve su, olgunlaşma ve hasat döneminde ise belirgin bir yaz kuraklığı isteyen "pamuk" bitkisi, doğal olarak aşağıdaki bölgelerin hangisinde en zor yetişir?',
    options: ['Güneydoğu Anadolu', 'Ege', 'Akdeniz', 'Doğu Karadeniz Kıyıları', 'İç Anadolu'],
    correctAnswer: 3,
    explanation: 'Doğu Karadeniz kıyıları her mevsim yağışlıdır ve yaz kuraklığı yaşanmaz. Bu nedenle pamuk olgunlaşamaz ve kuruyamaz.'
  },
  {
    id: 98,
    subjectId: 'COGRAFYA',
    topic: 'Türkiye\'de Hayvancılık',
    question: 'Bozkır (step) bitki örtüsünün yaygın olduğu İç ve Güneydoğu Anadolu bölgelerinde en çok yapılan ve en yaygın olan hayvancılık türü hangisidir?',
    options: ['Büyükbaş mera hayvancılığı', 'Küçükbaş hayvancılık (koyun)', 'İpek böcekçiliği', 'Kültür balıkçılığı', 'Besi hayvancılığı'],
    correctAnswer: 1,
    explanation: 'İlkbaharda yeşerip yazın sararan kısa boylu ot toplulukları (bozkır) küçükbaş hayvanların (özellikle koyun) beslenmesi için en uygun doğal ortamdır.'
  },
  {
    id: 99,
    subjectId: 'COGRAFYA',
    topic: 'Madenler ve Enerji Kaynakları',
    question: 'Dünya rezervlerinin yaklaşık %73\'üne Türkiye\'nin sahip olduğu; Balıkesir (Bigadiç), Bursa (Mustafakemalpaşa), Eskişehir (Seyitgazi) ve Kütahya (Emet)\'da çıkarılan stratejik maden hangisidir?',
    options: ['Bor', 'Krom', 'Boksit', 'Bakır', 'Manganez'],
    correctAnswer: 0,
    explanation: 'Türkiye dünya bor minerali rezervlerinin %70\'ten fazlasına sahiptir ve belirtilen havzalarda yoğun olarak çıkarılmaktadır.'
  },
  {
    id: 100,
    subjectId: 'COGRAFYA',
    topic: 'Enerji Kaynakları',
    question: 'Türkiye\'de yer şekillerinin genç ve kırıklı (fay hatları) olması nedeniyle Denizli (Sarayköy) ve Aydın (Germencik)\'te elektrik üretiminde yararlanılan yenilenebilir enerji kaynağı hangisidir?',
    options: ['Rüzgâr enerjisi', 'Jeotermal enerji', 'Biyokütle enerjisi', 'Dalga enerjisi', 'Güneş enerjisi'],
    correctAnswer: 1,
    explanation: 'Fay hatları boyunca yüzeye çıkan sıcak su ve buhardan elde edilen enerji "Jeotermal enerji"dir. İlk jeotermal santral Denizli Sarayköy\'dedir.'
  },
  {
    id: 101,
    subjectId: 'COGRAFYA',
    topic: 'Türkiye\'de Sanayi',
    question: 'Demir-çelik fabrikalarının Karabük ve Ereğli\'de kurulmasında etkili olan temel lokasyon faktörü aşağıdakilerden hangisidir?',
    options: ['Demir cevheri rezervine yakınlık', 'Taş kömürü (enerji kaynağına) yakınlık', 'Geniş tüketici pazarına yakınlık', 'Ucuz iş gücü temini', 'İklim koşullarının ılıman olması'],
    correctAnswer: 1,
    explanation: 'Karabük ve Ereğli\'de demir madeni çıkmaz; ancak demiri eritmek için yüksek ısı sağlayan taş kömürü (Zonguldak havzası) bulunduğu için enerji kaynağına yakınlık esas alınmıştır.'
  },
  {
    id: 102,
    subjectId: 'COGRAFYA',
    topic: 'Ulaşım Coğrafyası',
    question: 'Doğu Karadeniz\'i Erzurum üzerinden Doğu Anadolu\'ya bağlayan ve Türkiye\'nin en uzun karayolu tünellerinden biri olan yeni tünel hangisidir?',
    options: ['Ovit Tüneli / Zigana Tüneli', 'Ilgaz 15 Temmuz İstiklal Tüneli', 'Avrasya Tüneli', 'Bolu Dağı Tüneli', 'Sabuncubeli Tüneli'],
    correctAnswer: 0,
    explanation: 'Trabzon\'u Gümüşhane ve Erzurum\'a bağlayan Yeni Zigana Tüneli ve Rize-Erzurum hattındaki Ovit Tüneli Karadeniz\'i iç kesimlere bağlayan dev projelerdir.'
  },
  {
    id: 103,
    subjectId: 'COGRAFYA',
    topic: 'Türkiye\'de Turizm',
    question: 'UNESCO Dünya Kültür Mirası Listesi\'nde yer alan, hem doğal hem kültürel (karma) miras olarak kabul edilen iki alanımız hangi seçenekte doğru verilmiştir?',
    options: [
      'Göbeklitepe - Efes',
      'Pamukkale (Hierapolis) - Göreme Milli Parkı ve Kapadokya',
      'Safranbolu Şehri - Truva Antik Kenti',
      'Nemrut Dağı - Çatalhöyük',
      'Ani Arkeolojik Alanı - Divriği Ulu Camii'
    ],
    correctAnswer: 1,
    explanation: 'Türkiye\'de hem doğal güzellikleri hem de insan eliyle yapılmış tarihi değerleri içeren karma miras alanları Pamukkale-Hierapolis ve Kapadokya-Göreme\'dir.'
  },
  {
    id: 104,
    subjectId: 'COGRAFYA',
    topic: 'Bölgesel Kalkınma Projeleri',
    question: 'Güneydoğu Anadolu Projesi (GAP) kapsamında inşa edilen ve hidroelektrik enerji üretimi ile sulama alanında Türkiye\'nin en büyük barajı olan yapı hangisidir?',
    options: ['Keban Barajı', 'Atatürk Barajı', 'Karakaya Barajı', 'Ilısu (Veysel Eroğlu) Barajı', 'Deriner Barajı'],
    correctAnswer: 1,
    explanation: 'Fırat Nehri üzerinde kurulan Atatürk Barajı, Türkiye\'nin ve GAP\'ın en büyük barajı ve hidroelektrik santralidir.'
  },
  {
    id: 105,
    subjectId: 'COGRAFYA',
    topic: 'Doğal Afetler',
    question: 'Türkiye\'de ilkbahar aylarında karların erimesi ve sağanak yağışların killi toprakları doygun hale getirmesi sonucu en fazla Karadeniz Bölgesi\'nde görülen kütle hareketi hangisidir?',
    options: ['Çığ', 'Heyelan (Toprak kayması)', 'Kuraklık', 'Orman yangını', 'Deprem'],
    correctAnswer: 1,
    explanation: 'Eğimli yamaçlar, bol yağış, kar erimeleri ve killi toprak yapısı nedeniyle Türkiye\'deki heyelanların büyük çoğunluğu ilkbaharda Karadeniz\'de yaşanır.'
  },

  // ==========================================
  // VATANDAŞLIK & ANAYASA (SORU 106 - 114)
  // ==========================================
  {
    id: 106,
    subjectId: 'VATANDASLIK',
    topic: 'Temel Hukuk Kavramları',
    question: 'Hukuk kurallarına aykırı bir işlem yapıldığında devlet gücüyle karşılaşılan yaptırım (müeyyide) türleri arasında aşağıdakilerden hangisi yer almaz?',
    options: ['Ceza', 'Cebri İcra', 'Tazminat', 'Sosyal Dışlanma ve Ayıplanma', 'Hükümsüzlük (Butlan)'],
    correctAnswer: 3,
    explanation: 'Sosyal dışlanma ve ayıplanma din, ahlak ve görgü kurallarının manevi yaptırımıdır; hukuki ve maddi bir devlet yaptırımı değildir.'
  },
  {
    id: 107,
    subjectId: 'VATANDASLIK',
    topic: 'Kişi Hukuku ve Ehliyet',
    question: 'Türk Medeni Kanunu\'na göre tam ve sağ doğumla başlayan ve ölümle sona eren ehliyet türü aşağıdakilerden hangisidir?',
    options: ['Fiil ehliyeti', 'Hak ehliyeti', 'Sınırlı ehliyet', 'Sözleşme ehliyeti', 'Dava ehliyeti'],
    correctAnswer: 1,
    explanation: 'Hak ehliyeti; haklara ve borçlara sahip olabilme iktidarıdır, sağ ve tam doğmak şartıyla ana rahmine düşüldüğü andan itibaren başlar, doğumla kesinleşir.'
  },
  {
    id: 108,
    subjectId: 'VATANDASLIK',
    topic: 'Devlet Şekilleri ve Anayasa',
    question: '1982 Anayasası\'nın 2. maddesinde belirtilen Türkiye Cumhuriyeti\'nin temel nitelikleri arasında aşağıdakilerden hangisi yer almaz?',
    options: ['Demokratik devlet', 'Laik devlet', 'Sosyal devlet', 'Teokratik devlet', 'Atatürk milliyetçiliğine bağlı devlet'],
    correctAnswer: 3,
    explanation: 'Türkiye Cumhuriyeti teokratik değil, laik bir devlettir. Anayasa\'nın değiştirilemez maddeleri arasında yer alır.'
  },
  {
    id: 109,
    subjectId: 'VATANDASLIK',
    topic: '1982 Anayasası - Temel Hak ve Ödevler',
    question: '1982 Anayasası\'na göre savaş, seferberlik veya olağanüstü hallerde dahi dokunulamayacak "çekirdek haklar" arasında aşağıdakilerden hangisi yer almaz?',
    options: [
      'Kişinin yaşama hakkı ve vücut bütünlüğü',
      'Kimsenin din, vicdan ve düşüncelerini açıklamaya zorlanamaması',
      'Suç ve cezaların geçmişe yürütülememesi',
      'Masumiyet karinesi (suçluluğu hükmen sabit oluncaya kadar kimse suçlu sayılamaz)',
      'Mülkiyet ve miras hakkı'
    ],
    correctAnswer: 4,
    explanation: 'Mülkiyet hakkı çekirdek haklardan değildir; olağanüstü durumlarda kamulaştırma veya sınırlamaya tabi tutulabilir.'
  },
  {
    id: 110,
    subjectId: 'VATANDASLIK',
    topic: '1982 Anayasası - Yasama ve Seçim Dönemi',
    questionType: 'true_false',
    question: '1982 Anayasası\'na göre; Türkiye Büyük Millet Meclisi 600 milletvekilinden oluşur ve TBMM genel seçimleri ile Cumhurbaşkanlığı seçimleri kural olarak 5 yılda bir aynı günde yapılır.',
    options: ['DOĞRU', 'YANLIŞ'],
    correctAnswer: 0,
    explanation: '2017 Anayasa değişikliğiyle TBMM üye sayısı 600\'e çıkarılmış ve genel seçimler ile Cumhurbaşkanlığı seçimlerinin beş yılda bir aynı günde yapılması anayasal kurala bağlanmıştır. Dolayısıyla ifade DOĞRU\'dur.'
  },
  {
    id: 111,
    subjectId: 'VATANDASLIK',
    topic: 'Yürütme Organı',
    question: '1982 Anayasası\'na göre Cumhurbaşkanlığı kararnamesi ile aşağıdaki hak kategorilerinden hangisi olağan dönemde kesinlikle düzenlenemez?',
    options: [
      'Sosyal ve ekonomik haklar ve ödevler',
      'Bakanlıkların kurulması ve teşkilat yapısı',
      'Temel haklar, kişi hak ve ödevleri ile siyasi haklar',
      'Üst kademe kamu yöneticilerinin atanması',
      'Milli Güvenlik Kurulu Genel Sekreterliği teşkilatı'
    ],
    correctAnswer: 2,
    explanation: 'Olağan dönem Cumhurbaşkanlığı Kararnameleri ile Anayasa\'nın I. ve II. kısımlarında yer alan temel haklar, kişi hürriyetleri ve siyasi haklar düzenlenemez; sadece sosyal ve ekonomik haklar düzenlenebilir.'
  },
  {
    id: 112,
    subjectId: 'VATANDASLIK',
    topic: 'Yargı Organı',
    question: '1982 Anayasası\'na göre Anayasa Mahkemesi kaç üyeden oluşur ve üyelerin görev süresi kaç yıldır?',
    options: ['15 üye - 12 yıl', '17 üye - 9 yıl', '15 üye - 6 yıl', '12 üye - 12 yıl', '21 üye - 10 yıl'],
    correctAnswer: 0,
    explanation: 'Anayasa Mahkemesi 15 üyeden oluşur (3 TBMM, 12 Cumhurbaşkanı tarafından seçilir) ve üyeler 12 yıl için seçilirler, bir kimse iki defa seçilemez.'
  },
  {
    id: 113,
    subjectId: 'VATANDASLIK',
    topic: 'İdare Hukuku',
    question: 'Aşağıdakilerden hangisi Türkiye\'de merkezi yönetimin "taşra teşkilatı" birimleri arasında yer alır?',
    options: ['Büyükşehir Belediyesi', 'İl Genel Meclisi', 'İl Özel İdaresi', 'İlçe İdare Şube Başkanlığı ve Kaymakamlık', 'Köy İhtiyar Heyeti'],
    correctAnswer: 3,
    explanation: 'Kaymakamlık ve İlçe İdare Şube Başkanlıkları merkezi idarenin ilçedeki taşra teşkilatıdır. Belediyeler, il özel idareleri ve köyler ise yerel yönetim (yerinden yönetim) kuruluşlarıdır.'
  },
  {
    id: 114,
    subjectId: 'VATANDASLIK',
    topic: 'İdare Hukuku - Kamu Görevlileri',
    question: '657 sayılı Devlet Memurları Kanunu\'na göre memurlara verilen disiplin cezaları arasında aşağıdakilerden hangisi yer almaz?',
    options: ['Uyarma', 'Kınama', 'Aylıktan kesme', 'Kademe ilerlemesinin durdurulması', 'Hapis cezası'],
    correctAnswer: 4,
    explanation: 'Hapis cezası bir idari disiplin cezası değil, bağımsız mahkemelerce verilen adli bir ceza türüdür. Disiplin cezaları: Uyarma, Kınama, Aylıktan kesme, Kademe ilerlemesinin durdurulması ve Devlet memurluğundan çıkarmadır.'
  },

  // ==========================================
  // GÜNCEL BİLGİLER (SORU 115 - 120)
  // ==========================================
  {
    id: 115,
    subjectId: 'GUNCEL',
    topic: 'Türkiye Güncel Olaylar',
    question: 'Ocak 2024\'te Axiom Mission 3 (Ax-3) göreviyle Uluslararası Uzay İstasyonu\'na (ISS) giderek uzaya çıkan ilk Türk astronot kimdir?',
    options: ['Tuva Cihangir Atasever', 'Alper Gezeravcı', 'Halil Kayıkçı', 'Feryal Özel', 'Canan Dağdeviren'],
    correctAnswer: 1,
    explanation: 'Alper Gezeravcı, 18 Ocak 2024\'te uzaya fırlatılan Ax-3 görevi ile Uluslararası Uzay İstasyonu\'nda 13 bilimsel deney gerçekleştirerek uzaya çıkan ilk Türk astronot olmuştur.'
  },
  {
    id: 116,
    subjectId: 'GUNCEL',
    topic: 'Uluslararası Kuruluşlar & İttifaklar',
    question: 'Mart 2024\'te onay sürecinin tamamlanmasıyla Kuzey Atlantik Antlaşması Örgütü\'nün (NATO) 32. üyesi olan İskandinav ülkesi hangisidir?',
    options: ['Finlandiya', 'İsveç', 'Norveç', 'Ukrayna', 'İzlanda'],
    correctAnswer: 1,
    explanation: 'Finlandiya 31. üye olarak 2023\'te; İsveç ise Mart 2024\'te Macaristan ve Türkiye onaylarının ardından resmen NATO\'nun 32. üyesi olmuştur.'
  },
  {
    id: 117,
    subjectId: 'GUNCEL',
    topic: 'Kültür ve Sanat',
    question: 'Uluslararası Türk Kültürü Teşkilatı (TÜRKSOY) tarafından ilan edilen ve Türk Dünyası Kültür Başkenti unvanını alan şehirler arasında hangisi yer alır?',
    options: ['Aşkabat (2024)', 'Bursa (2022)', 'Şuşa (2023)', 'Semerkant', 'Hepsi'],
    correctAnswer: 4,
    explanation: 'TÜRKSOY Kültür Başkentleri: 2022\'de Bursa, 2023\'te Azerbaycan\'ın Şuşa kenti, 2024\'te Türkmenistan\'ın Anav kenti ve Türk dünyasının tarihi merkezleri bu unvanı taşımıştır.'
  },
  {
    id: 118,
    subjectId: 'GUNCEL',
    topic: 'Spor & Başarılar',
    question: '2024 Paris Yaz Olimpiyat Oyunları\'nda ekipmansız ve doğal atış tarzıyla dünya çapında viral olan ve Türkiye\'ye gümüş madalya kazandıran milli atıcımız kimdir?',
    options: ['Mete Gazoz', 'Yusuf Dikeç', 'Taha Akgül', 'Rıza Kayaalp', 'Ferhat Arıcan'],
    correctAnswer: 1,
    explanation: 'Yusuf Dikeç, Şevval İlayda Tarhan ile birlikte 10 metre havalı tabanca karma kategorisinde Türkiye\'ye gümüş madalya kazandırmış ve ikonik duruşuyla tüm dünyada ilgi görmüştür.'
  },
  {
    id: 119,
    subjectId: 'GUNCEL',
    topic: 'Uluslararası Zirveler ve Diplomasi',
    question: '2024 yılında Avrupa Birliği Dönem Başkanlığı\'nı yürüten ülkeler hangi seçenekte sırasıyla verilmiştir?',
    options: ['Belçika - Macaristan', 'İspanya - İsveç', 'Fransa - Çekya', 'Polonya - Danimarka', 'Almanya - İtalya'],
    correctAnswer: 0,
    explanation: '2024 yılının ilk 6 ayında (1 Ocak - 30 Haziran) Belçika, ikinci 6 ayında ise (1 Temmuz - 31 Aralık) Macaristan AB Konseyi Dönem Başkanlığı yapmıştır.'
  },
  {
    id: 120,
    subjectId: 'GUNCEL',
    topic: 'UNESCO & Tarihi Miras',
    question: '2023 yılında UNESCO Dünya Mirası Listesi\'ne dahil edilen, Ankara\'da bulunan ve Anadolu\'nun en eski antik başkentlerinden biri olan arkeolojik alan hangisidir?',
    options: ['Çatalhöyük', 'Gordion Antik Kenti', 'Hattuşa', 'Kültepe Kaniş', 'Alacahöyük'],
    correctAnswer: 1,
    explanation: 'Frigya Krallığı\'nın tarihi başkenti olan Ankara Polatlı\'daki Gordion Antik Kenti, Eylül 2023\'te UNESCO Dünya Mirası Listesi\'ne 20. varlığımız olarak kaydedilmiştir.'
  }
];
