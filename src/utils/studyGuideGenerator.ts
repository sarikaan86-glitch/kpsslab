import { ExamResult, Question, SubjectId } from '../types/exam';

export interface WeakTopicAnalysis {
  subjectId: SubjectId;
  subjectName: string;
  topic: string;
  wrongCount: number;
  emptyCount: number;
  totalAsked: number;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  keyNotes: string[];
  osymTips: string;
  recommendedAction: string;
  questionIds: number[];
}

export interface PersonalizedStudyGuide {
  examDate: string;
  estimatedP3: number;
  totalNet: number;
  weakTopics: WeakTopicAnalysis[];
  studyPlan: {
    day: string;
    focusTopic: string;
    action: string;
    targetQuestions: number;
  }[];
  generalAdvice: string[];
}

const TOPIC_KNOWLEDGE_BASE: Record<
  string,
  {
    keyNotes: string[];
    osymTips: string;
    recommendedAction: string;
  }
> = {
  // --- TÜRKÇE ---
  'Sözcükte Anlam': {
    keyNotes: [
      'Mecaz anlam, yan anlam ve terim anlam ayrımlarına dikkat edin.',
      'Sözcüğün bağlam içindeki (cümledeki) görevini tespit etmeden karar vermeyin.',
      'Deyim ve atasözlerinin kalıplaşmış yapısını ve aktardığı mecazi mesajı inceleyin.'
    ],
    osymTips: 'ÖSYM altı çizili söz öbeklerinde genellikle cümlenin tamamını okumayan adayları yanıltacak çeldiriciler kullanır.',
    recommendedAction: 'Günde 25 sözcükte anlam ve deyim sorusu çözerek bağlam okuması yapın.'
  },
  'Cümlede Anlam': {
    keyNotes: [
      'Önyargı (peşin hüküm) ile olasılık/ihtimal cümlelerini karıştırmayın.',
      'Neden-sonuç, amaç-sonuç ve koşul-sonuç bağıntılarını "-mek amacıyla" veya "-dığı için" formülleriyle test edin.',
      'Doğrudan ve dolaylı anlatım ayrımlarını yüklem aktarımıyla ayırt edin.'
    ],
    osymTips: 'Kesinlik ve ihtimal bildiren zarfların aynı cümlede yer alması anlatım çelişkisi oluşturur.',
    recommendedAction: 'Cümle analizi ve anlam ilişkileri üzerine 30 soruluk odaklanma testi çözün.'
  },
  'Paragrafta Ana Düşünce': {
    keyNotes: [
      'Ana düşünce genellikle metnin ilk veya son cümlesinde toparlanır.',
      '"Oysa, ancak, asıl, nitekim, kısacası" gibi geçiş ifadelerinden sonraki cümleler yazarın asıl iletisini taşır.',
      'Kendi öznel yorumunuzu değil, yazarın savunduğu tezi seçeneklerde arayın.'
    ],
    osymTips: 'Çeldiriciler genellikle metinde geçen doğru bir bilgiyi içerir ancak o bilgi metnin ana fikri değil yardımcı fikridir.',
    recommendedAction: 'Her gün sabah zihni açıkken 20 adet KPSS paragraf sorusu çözmeyi alışkanlık haline getirin.'
  },
  'Ses Bilgisi': {
    keyNotes: [
      'Ünlü düşmesi: "akıl-ı > aklını", "burun-u > burnu", "kayıp olmak > kaybolmak".',
      'Ünsüz yumuşaması: p, ç, t, k seslerinin b, c, d, ğ seslerine dönüşmesi.',
      'Ünsüz benzeşmesi (sertleşme): FıSTıKÇı ŞaHaP kuralı (ör: kitap-da > kitapta).'
    ],
    osymTips: 'ÖSYM sıklıkla türetilirken ünlü düşmesine uğrayan sözcükleri (oyun-a > oyna-, uyu-ku > uyku) sorar.',
    recommendedAction: 'Ses olayları tablosunu inceleyin ve 50 karma ses bilgisi sorusuyla pekiştirin.'
  },
  'Yazım Kuralları': {
    keyNotes: [
      '"ki" bağlacı ayrı yazılır; SOMBAHÇEMİ istisnaları bitişiktir (Sanki, Oysaki, Mademki, Belki, Halbuki, Çünkü, Meğerki, İllaki).',
      '"de/da" bağlacı cümleden çıkarıldığında anlam bozulmaz, ayrı yazılır ve asla te/ta olmaz.',
      'Kurum, kuruluş ve kurul adlarına gelen ekler kesme işaretiyle ayrılmaz (ör: Türk Dil Kurumunun).'
    ],
    osymTips: 'Birleşik sözcüklerin yazımında ikinci sözcük anlam kaybına uğramışsa bitişik yazılır.',
    recommendedAction: 'TDK Güncel Yazım Kılavuzu kılavuzundaki kalıplaşmış birleşik kelimeler listesini gözden geçirin.'
  },
  'Noktalama İşaretleri': {
    keyNotes: [
      'Virgül; şart ekinden (-se/-sa), zarf-fiil eklerinden (-ıp, -erek, -ken) ve bağlaçlardan sonra konmaz.',
      'İki noktadan sonra cümle geliyorsa büyük harfle, örnekler sıralanıyorsa küçük harfle başlanır.',
      'Noktalı virgül; ögeleri arasında virgül bulunan sıralı cümleleri veya tür ve takımları ayırmak için kullanılır.'
    ],
    osymTips: 'ÖSYM genellikle virgülün kullanılmayacağı yerleri çeldirici olarak sorar.',
    recommendedAction: 'Noktalama işaretleri kurallarını 1 sayfalık zihin haritasına dökün.'
  },
  'Sözel Mantık': {
    keyNotes: [
      'Asla zihinden çözmeyin; kesin bilgileri yerleştirdiğiniz bir tablo / matris çizin.',
      'Değişken sayısı az olan unsuru (örneğin kat numarası, gün veya sıra) tablonun sabit ekseni yapın.',
      'İhtimalli durumları iki ayrı alternatif tablo sütununda paralel takip edin.'
    ],
    osymTips: 'Sorudaki "kesinlikle doğrudur / kesinlikle yanlıştır" köklerine dikkat edin; ihtimalli bilgileri kesin sanmayın.',
    recommendedAction: 'Haftada en az 8 sözel mantık senaryosu çözerek tablo kurma hızınızı 4 dakikanın altına indirin.'
  },

  // --- MATEMATİK ---
  'Temel Kavramlar & Tek-Çift Sayılar': {
    keyNotes: [
      '2n ve 4y gibi çift katsayılı ifadeler y ne olursa olsun daima ÇİFTTİR.',
      'Tek + Çift = Tek; Tek . Tek = Tek; Çift . Her Şey = Çift.',
      'Tam sayı denildiğinde negatif tam sayıları ve sıfırı (0) mutlaka test edin.'
    ],
    osymTips: 'Soruda "pozitif tam sayı" mı yoksa sadece "tam sayı" mı dendiği en kritik ince detaydır.',
    recommendedAction: 'Temel kavramlar ve tek-çift sayı yorumlama üzerine 40 soru çözün.'
  },
  'Asal Sayılar ve Faktöriyel': {
    keyNotes: [
      'Faktöriyel parantezine alırken en küçük faktöriyelli terime benzetin: (8! + 9!) = 8!(1 + 9) = 10 . 8!.',
      'En küçük asal sayı 2\'dir ve 2 haricinde çift asal sayı yoktur.',
      'Aralarında asal sayıların 1\'den başka ortak pozitif böleni yoktur.'
    ],
    osymTips: 'Büyük faktöriyelli bölme işlemlerinde ortak çarpan parantezine alma adımı soruyu saniyeler içinde çözer.',
    recommendedAction: 'Faktöriyel sadeleştirme ve asal çarpanlara ayırma testini tekrar edin.'
  },
  'Basit Eşitsizlikler': {
    keyNotes: [
      'Eşitsizlik her iki tarafı negatif bir sayıyla çarpılır veya bölünürse EŞİTSİZLİK YÖN DEĞİŞTİRİR.',
      '-3 < x < 4 gibi bir aralıkta 0 bulunduğundan x² en az 0 olur: 0 ≤ x² < 16.',
      'Taraf tarafa çıkarma ve bölme yapılmaz; çıkarma için ikinci eşitsizlik (-) ile çarpılıp toplanır.'
    ],
    osymTips: 'Aralıkta 0 varsa karesi alınırken sol sınır daima "0 ≤ x²" şeklinde kurulmalıdır.',
    recommendedAction: 'Karesel eşitsizlikler ve sınır belirleme üzerine 30 soru çözün.'
  },
  'Mutlak Değer': {
    keyNotes: [
      '|a - b| = |b - a| özelliğini unutmayın: |3 - x| ile |x - 3| birbirine eşittir.',
      '|f(x)| = c (c > 0) ise f(x) = c veya f(x) = -c olarak iki kola ayrılır.',
      'Mutlak değerli ifade asla negatif bir sayıya eşit olamaz.'
    ],
    osymTips: '|2x - 6| ifadesini 2|x - 3| olarak dışarı alıp benzer terimleri toplayarak sadeleştirin.',
    recommendedAction: 'Mutlak değerli denklem ve eşitsizliklerden 35 pratik soru çözün.'
  },
  'Üslü Sayılar': {
    keyNotes: [
      'Toplama yaparken ortak üslü çarpan parantezine alın: 3^(x+1) + 3^(x+2) = 3^x(3 + 9) = 12 . 3^x.',
      'Tabanlar aynıysa çarpımda üsler toplanır, bölmede çıkarılır.',
      'Negatif üs kesri ters çevirir: (a/b)^(-n) = (b/a)^n.'
    ],
    osymTips: 'Üslü denklemlerde tabanlar eşitse üsler eşitlenir; taban -1, 0, 1 durumları ayrı irdelenmelidir.',
    recommendedAction: 'Üslü denklem çözümleri üzerine 30 soru çözün.'
  },
  'Köklü Sayılar': {
    keyNotes: [
      'Kök dışına çıkarma: √(a² . b) = a√b. Örnek: √75 = 5√3, √27 = 3√3, √12 = 2√3.',
      'Köklü sayılarda toplama/çıkarma sadece kök içi ve derecesi aynı olan terimler arasında katsayılarla yapılır.',
      'Paydayı rasyonel yapmak için ifade eşleniği ile çarpılır: (√a - √b)(√a + √b) = a - b.'
    ],
    osymTips: 'Toplama ve çıkarmada kök içlerini asal çarpanlarına ayırıp dışarı almadan işlem yapmaya kalkışmayın.',
    recommendedAction: 'Köklü sayılarda dört işlem ve eşlenik testinden 30 soru tamamlayın.'
  },
  'Problemler': {
    keyNotes: [
      'Bilinmeyen sayısını minimumda tutun (x ve y yerine tek bilinmeyen x ve f(x) kullanın).',
      'Yüzde problemlerinde başlangıç miktarına daima 100x deyin.',
      'Hız problemlerinde temel formül: Yol = Hız x Zaman (x = V . t).'
    ],
    osymTips: 'ÖSYM problem sorularında hikaye uzundur ancak matematiksel model genellikle 1. dereceden 1 bilinmeyenli denklemdir.',
    recommendedAction: 'Her gün 15 adet rutin olmayan yeni nesil problem çözün.'
  },

  // --- TARİH ---
  'İlk Türk - İslam Devletleri': {
    keyNotes: [
      'Dandanakan (1040): Büyük Selçuklu kuruldu, Gazneliler yıkılışa geçti.',
      'Pasinler (1048): Selçuklu-Bizans arasındaki ilk büyük savaş ve keşif.',
      'Malazgirt (1071): Anadolu\'nun kapıları Türklere tamamen açıldı.'
    ],
    osymTips: 'Miryokefalon (1176) ile Anadolu\'nun tapusunun Türklerde kesinleştiği bilgisini Malazgirt ile karıştırmayın.',
    recommendedAction: 'Selçuklu dönemi savaşları ve beylikler kronoloji şemasını tekrar edin.'
  },
  'Kurtuluş Savaşı Hazırlık Dönemi': {
    keyNotes: [
      'Amasya Genelgesi: Milli Mücadelenin amacı, gerekçesi ve yöntemi ilk kez belirlendi.',
      'Erzurum Kongresi: Milli sınırlardan (Misak-ı Milli) ve manda/himayenin reddinden ilk kez bahsedildi.',
      'Sivas Kongresi: Tüm cemiyetler birleştirildi, Temsil Heyeti Ali Fuat Paşa\'yı atayarak ilk kez yürütme yetkisini kullandı.'
    ],
    osymTips: 'Genelge ve kongrelerin kronolojik sırası ÖSYM\'nin en sevdiği banko soru formatlarındandır.',
    recommendedAction: 'Amasya -> Erzurum -> Sivas -> Amasya Görüşmeleri kronolojisini ezberleyin.'
  },
  'Kurtuluş Savaşı Antlaşmalar': {
    keyNotes: [
      'Gümrü Antlaşması (1920): TBMM\'nin uluslararası ilk askeri ve siyasi başarısı (Doğu cephesi kapandı).',
      'Moskova Antlaşması (1921): İlk kez büyük bir Avrupalı devlet (Sovyet Rusya) TBMM\'yi tanıdı, ilk Misak-ı Milli tavizi (Batum) verildi.',
      'Ankara Antlaşması (1921): Fransa ile imzalandı, Güney Cephesi kapandı; Hatay hariç güney sınırı çizildi.',
      'Mudanya Mütarekesi (1922): İstanbul, Boğazlar ve Doğu Trakya savaşsız kurtarıldı.'
    ],
    osymTips: 'Hangi antlaşmanın hangi savaştan sonra imzalandığını (Sakarya sonrası: Ankara ve Kars; I. İnönü sonrası: Moskova) tabloyla çalışın.',
    recommendedAction: 'Kurtuluş Savaşı cepheler ve antlaşmalar tablosuna 20 dakika göz atın.'
  },

  // --- COĞRAFYA ---
  'Türkiye\'nin Yer Şekilleri': {
    keyNotes: [
      'Kıvrım Dağları: Kuzey Anadolu Dağları (Kaçkarlar) ve Toroslar (Alp-Himalaya orojenezi).',
      'Kırık Dağları: Kaz, Madra, Yunt, Bozdağlar, Aydın, Menteşe Dağları ve Amanoslar (Horst-Graben).',
      'Volkanik Dağlar: Ağrı, Tendürek, Süphan, Nemrut (Doğu Anadolu); Erciyes, Melendiz, Hasan, Karadağ, Karacadağ (İç Anadolu). Karacadağ (GDA).'
    ],
    osymTips: 'ÖSYM Kaçkar veya Toroslar gibi kıvrım dağlarını volkanik dağ şıklarının arasına çeldirici olarak koyar.',
    recommendedAction: 'Dilsiz Türkiye haritası üzerinde volkanik dağları ve masif arazileri işaretleyin.'
  },
  'Türkiye\'nin İklimi': {
    keyNotes: [
      'Karadeniz İklimi: Her mevsim yağışlı, en çok yağış sonbaharda, orografik (yamaç) yağış hakim.',
      'Akdeniz İklimi: Yazlar sıcak ve kurak, kışlar ılık ve yağışlı, en çok yağış kışın, cephesel yağış hakim.',
      'Karasal İklim: En çok yağış ilkbaharda (konveksiyonel / 40 ikindi yağışları).'
    ],
    osymTips: 'Rize\'nin fazla yağış alması yükselti ve dağların kıyıya dik değil hemen paralel yükselmesindendir.',
    recommendedAction: 'Yağış rejimleri ve Türkiye iklim grafikleri özetini inceleyin.'
  },

  // --- VATANDAŞLIK ---
  '1982 Anayasası - Yasama ve Seçim Dönemi': {
    keyNotes: [
      'TBMM üye sayısı: 600 milletvekili.',
      'TBMM ve Cumhurbaşkanlığı seçimleri kural olarak 5 yılda bir aynı günde yapılır.',
      'Milletvekili seçilme yaşı: 18 yaşını doldurmuş olmak.'
    ],
    osymTips: '2017 Anayasa değişiklikleri öncesi 550 milletvekili ve 4 yıllık süreler çeldirici olarak verilir.',
    recommendedAction: '1982 Anayasası güncel yasama ve yürütme maddelerini özet tablodan tekrar edin.'
  },
  'İdare Hukuku': {
    keyNotes: [
      'Merkezi Yönetim Taşra Teşkilatı: İl İdaresi (Vali), İlçe İdaresi (Kaymakam), Bucak.',
      'Yerel Yönetimler (Mahalli İdareler): İl Özel İdaresi, Belediye, Büyükşehir Belediyesi, Köy.',
      'Vali istisnai memurdur; Kaymakam güvenceli meslek memurudur.'
    ],
    osymTips: 'İl Özel İdaresi yerel yönetimdir; İl İdare Kurulu ise merkezi idarenin taşra birimidir.',
    recommendedAction: 'Türkiye İdari Teşkilat Şemasını (Başkent, Taşra, Yerinden Yönetim) şema üzerinde çalışın.'
  }
};

export const generateStudyGuide = (
  result: ExamResult,
  questions: Question[]
): PersonalizedStudyGuide => {
  const topicMap: Record<
    string,
    {
      subjectId: SubjectId;
      topic: string;
      wrongCount: number;
      emptyCount: number;
      totalAsked: number;
      questionIds: number[];
    }
  > = {};

  // Analyze every question
  questions.forEach((q) => {
    const userAns = result.answers[q.id];
    const isCorrect = userAns === q.correctAnswer;
    const isEmpty = userAns === null || userAns === undefined;
    const isWrong = !isEmpty && !isCorrect;

    const key = `${q.subjectId}___${q.topic}`;
    if (!topicMap[key]) {
      topicMap[key] = {
        subjectId: q.subjectId,
        topic: q.topic,
        wrongCount: 0,
        emptyCount: 0,
        totalAsked: 0,
        questionIds: [],
      };
    }

    topicMap[key].totalAsked++;
    if (isWrong) {
      topicMap[key].wrongCount++;
      topicMap[key].questionIds.push(q.id);
    } else if (isEmpty) {
      topicMap[key].emptyCount++;
      topicMap[key].questionIds.push(q.id);
    }
  });

  // Filter only topics with wrong or empty answers
  const weakTopicsList: WeakTopicAnalysis[] = Object.values(topicMap)
    .filter((t) => t.wrongCount > 0 || t.emptyCount > 0)
    .map((t) => {
      const errorRate = (t.wrongCount + t.emptyCount * 0.5) / t.totalAsked;
      let priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' = 'MEDIUM';
      if (t.wrongCount >= 2 || errorRate >= 0.8) priority = 'CRITICAL';
      else if (t.wrongCount === 1 || errorRate >= 0.5) priority = 'HIGH';

      const subjectNameMap: Record<SubjectId, string> = {
        TURKCE: 'Türkçe',
        MATEMATIK: 'Matematik & Geometri',
        TARIH: 'Tarih',
        COGRAFYA: 'Coğrafya',
        VATANDASLIK: 'Vatandaşlık & Anayasa',
        GUNCEL: 'Güncel Bilgiler',
      };

      const defaultKnowledge = {
        keyNotes: [
          `${t.topic} konusunda kavram ve kural temellerini gözden geçirin.`,
          'Soru köklerini dikkatle okuyarak olumsuz ifadelere ("değildir", "yoktur") odaklanın.',
          'Konuyla ilgili çözümlü çıkmış KPSS sorularını analiz edin.'
        ],
        osymTips: 'ÖSYM bu konuda kavram yanılgılarını ve dikkatsizlik tuzaklarını test eder.',
        recommendedAction: `Bu konudan en az 30 çözümlü soru çözerek eksikleri kapatın.`
      };

      const knowledge = TOPIC_KNOWLEDGE_BASE[t.topic] || defaultKnowledge;

      return {
        subjectId: t.subjectId,
        subjectName: subjectNameMap[t.subjectId] || t.subjectId,
        topic: t.topic,
        wrongCount: t.wrongCount,
        emptyCount: t.emptyCount,
        totalAsked: t.totalAsked,
        priority,
        keyNotes: knowledge.keyNotes,
        osymTips: knowledge.osymTips,
        recommendedAction: knowledge.recommendedAction,
        questionIds: t.questionIds,
      };
    })
    .sort((a, b) => {
      const priorityWeights = { CRITICAL: 3, HIGH: 2, MEDIUM: 1 };
      return priorityWeights[b.priority] - priorityWeights[a.priority] || b.wrongCount - a.wrongCount;
    });

  // Generate 7-day targeted study schedule based on worst topics
  const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
  const studyPlan = days.map((day, idx) => {
    const focus = weakTopicsList[idx % Math.max(1, weakTopicsList.length)];
    if (!focus) {
      return {
        day,
        focusTopic: 'Genel KPSS Deneme & Karma Tekrar',
        action: 'Zaman yönetimli 60 soruluk Genel Yetenek & Genel Kültür karma branş denemesi çözün.',
        targetQuestions: 60,
      };
    }
    return {
      day,
      focusTopic: `${focus.subjectName} > ${focus.topic}`,
      action: `${focus.recommendedAction} Yanlış yaptığınız soru kalıplarını not defterine yazın.`,
      targetQuestions: focus.priority === 'CRITICAL' ? 45 : 30,
    };
  });

  const generalAdvice = [
    'Yanlış yapılan sorular birer hazinedir. Yanlışınızın dikkatsizlikten mi yoksa bilgi eksikliğinden mi kaynaklandığını mutlaka not edin.',
    'KPSS\'de 4 yanlış 1 doğruyu götürdüğünden, iki şık arasında kalmadığınız sürece rastgele işaretleme yapmaktan kaçının.',
    'Her gün 15-20 paragraf ve 10 problem sorusunu sabah saatlerinde çözerek beyin kondisyonunuzu diri tutun.',
    'Tarih ve Anayasa derslerinde ezber yerine neden-sonuç bağları ve anayasal kurum şemalarıyla görsel hafızanızı çalıştırın.'
  ];

  return {
    examDate: result.date,
    estimatedP3: result.estimatedP3Score,
    totalNet: result.totalNet,
    weakTopics: weakTopicsList,
    studyPlan,
    generalAdvice,
  };
};
