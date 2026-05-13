(function () {
  function getMobileNavCopy(isOpen) {
    const lang = document.documentElement.lang === "en" || localStorage.getItem("siteLang") === "en" ? "en" : "mk";
    if (lang === "en") {
      return isOpen ? "Close" : "Menu";
    }
    return isOpen ? "Затвори" : "Мени";
  }

  function syncMobileNavToggle(toggle, nav, isOpen) {
    const label = toggle.querySelector(".mobile-nav-toggle-label");
    const copy = getMobileNavCopy(isOpen);
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.setAttribute("aria-label", copy);
    if (label) {
      label.textContent = copy;
    }
    if (nav) {
      nav.classList.toggle("mobile-nav-open", isOpen);
    }
  }

  function initMobileNavigation() {
    const toggles = Array.from(document.querySelectorAll(".mobile-nav-toggle"));
    if (!toggles.length) return;

    toggles.forEach(function (toggle) {
      if (toggle.dataset.mobileNavReady === "true") return;
      const nav = toggle.closest("nav");
      toggle.dataset.mobileNavReady = "true";
      syncMobileNavToggle(toggle, nav, false);

      toggle.addEventListener("click", function () {
        const isOpen = toggle.getAttribute("aria-expanded") !== "true";
        syncMobileNavToggle(toggle, nav, isOpen);
      });

      if (nav) {
        nav.addEventListener("click", function (event) {
          if (!event.target.closest("a")) return;
          syncMobileNavToggle(toggle, nav, false);
        });
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      toggles.forEach(function (toggle) {
        syncMobileNavToggle(toggle, toggle.closest("nav"), false);
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 700) {
        toggles.forEach(function (toggle) {
          syncMobileNavToggle(toggle, toggle.closest("nav"), false);
        });
      }
    });

    document.addEventListener("languageChanged", function () {
      toggles.forEach(function (toggle) {
        syncMobileNavToggle(toggle, toggle.closest("nav"), toggle.getAttribute("aria-expanded") === "true");
      });
    });
  }

  initMobileNavigation();

  const page = document.body.dataset.page;
  if (!page) return;

  const dict = {
    index: {
      mk: {
        navHome: "Дома",
        navCorpus: "Корпус",
        navBiography: "ДОБРЕДОЈДОВТЕ ВО ХОЛАНДИЈА",
        navMedicalHumanities: "Медицински хуманистики",
        navNarrativeMedicine: "Наративна медицина",
        navAboutSite: "За истражувањето",
        navAboutAuthor: "За авторката",
        navContact: "Контакт",
        navScrollBrand: "Гласови на телото",
        heroEyebrow: "Македонска книжевност · Medical Humanities · Прва архива",
        heroTitleIntro: "Архиви на сведоштва",
        heroTitleMain: "Гласови на телото",
        heroTitleNote: "(патографија и фикција)",
        splashScrollHint: "",
        visitCorpus: "Библиотека",
        readingRoomKicker: "Reading Room",
        readingRoomTitle: "ЧИТАЛНА",
        readingRoomArchiveCta: "Библиотека",
        readingRoomBiographyKicker: "Текст",
        readingRoomBiographyTitle: "ДОБРЕ ДОЈДОВТЕ ВО ХОЛАНДИЈА",
        readingRoomBiographyPreview: "Личен и книжевен простор за разбирање на животните приказни зад архивата.",
        readingRoomBiographyCta: "ПРОЧИТАЈ ПОВЕЌЕ",
        readingRoomCarouselPrev: "Претходна картичка",
        readingRoomCarouselNext: "Следна картичка",
        heroIntroArchive: "Процесот на архивирање на овие „наративи на болеста“ беше мотивиран од празнината која постоеше во македонската научна и книжевна историја, а која го имаше занемарено постоењето на овие жанрови. Од овие причини, ова истражување беше и научен и креативен процес на создавање простор каде ќе се слушнат гласовите на невидливите и каде искуствата од болеста ќе бидат приказна која има своја вредност. Имајќи ја таа обврска и научна одговорност, оваа архива се претвори во научен документ, едукативен материјал, но и во подлабок, хуманистички чин.",
        heroSub: "Прва библиографија на патографии во македонската книжевност — гласови на пациенти, родители и семејства",
        browseArchive: "Прелистај архива",
        aboutProject: "За истражувањето",
        legendLabel: "Боите на болеста — секоја нијанса носи приказна",
        legendQuotesTitle: "Гласови од тишината",
        illnessChildhoodCancer: "Детски канцер",
        illnessChildhoodCancerDesc: "Жолтата нијанса ги истакнува гласовите на детството, семејната грижа и борбата со раното страдање.",
        illnessBreastCancer: "Карцином на дојка",
        illnessBreastCancerDesc: "Розовата боја означува текстови за телото, женското искуство, ранливоста и отпорот.",
        illnessCancerGeneral: "Општ канцер",
        illnessCancerGeneralDesc: "Неутралниот тон ги собира наративите за дијагноза, третман и егзистенцијална неизвесност.",
        illnessMental: "Ментална болест",
        illnessMentalDesc: "Зелената боја упатува на раскажувања за психичка криза, стигма и внатрешно преживување.",
        illnessAnxiety: "Анксиозност / ПТСН",
        illnessAnxietyDesc: "Сината нијанса ги следи траумата, немирот, сеќавањето и постојаната состојба на будност.",
        illnessAlz: "Алцхајмер",
        illnessAlzDesc: "Виолетовото ја означува ерозијата на меморијата, идентитетот и односите во семејството.",
        illnessLeukemia: "Леукемија",
        illnessLeukemiaDesc: "Портокаловата носи чувство на итност, медицинска борба и долготрајна грижа.",
        illnessPain: "Хронична болка",
        illnessPainDesc: "Црвената боја го нагласува секојдневното траење на болката и животот во постојана ограниченост.",
        illnessGrief: "Тага / Палијатива",
        illnessGriefDesc: "Оваа длабока сина нијанса зборува за загуба, грижа на крајот од животот и тивка блискост.",
        illnessRare: "Ретки болести",
        illnessRareDesc: "Зебра-мотивот ги претставува ретките состојби и искуствата што често остануваат невидливи.",
        archiveTitle: "Архива",
        filterAll: "Сите",
        filterAutobiography: "Автобиографија",
        filterFamily: "Семејна нарација",
        filterFiction: "Фикција",
        filterPoetry: "Поезија",
        addBookToggle: "+ Додај книга",
        deleteBookToggle: "Избриши книга",
        addBookNote: "Привремено: Оваа форма е за додавање книги од прелистувач и може да се избрише кога сајтот ќе биде финален.",
        labelTitle: "Наслов",
        labelAuthor: "Автор и година",
        labelType: "Тип",
        labelIllnessKey: "Клуч за болест (за орбите)",
        labelColor: "Боја",
        labelTags: "Тагови (со запирка)",
        labelDescription: "Краток опис",
        saveBook: "Зачувај книга",
        readMore: "Прочитај повеќе",
        aboutStripTitle: "Првата <em>архива</em> од ваков тип во македонската книжевност",
        aboutStripText: "Оваа библиографија собира автобиографии, семејни нарации, фикција и поезија — приказни што досега не биле систематизирани како корпус на медицинска хуманистика. Таа придонесува за македонските книжевни студии, дигиталната медицинска хуманистика и колективната меморија.",
        readMethodology: "Прочитај ја методологијата",
        footerCopy: "© 2025 · Прва архива · Медицинска хуманистика · Северна Македонија"
      },
      en: {
        navHome: "Home",
        navCorpus: "Corpus",
        navBiography: "Welcome To Holland",
        navMedicalHumanities: "Medical Humanities",
        navNarrativeMedicine: "Narrative Medicine",
        navAboutSite: "About the research",
        navAboutAuthor: "About the author",
        navContact: "Contact",
        navScrollBrand: "Voices of the body",
        heroEyebrow: "Macedonian literature · Medical Humanities · First archive",
        heroTitleIntro: "Archives of testimony",
        heroTitleMain: "Voices of the body",
        heroTitleNote: "(pathography and fiction)",
        splashScrollHint: "",
        visitCorpus: "Visit our corpus",
        readingRoomKicker: "Reading Room",
        readingRoomTitle: "READROOM",
        readingRoomArchiveCta: "Visit our corpus",
        readingRoomBiographyKicker: "Text",
        readingRoomBiographyTitle: "Welcome To Holland",
        readingRoomBiographyPreview: "A personal and literary space for reading the life stories behind the archive.",
        readingRoomBiographyCta: "READ MORE",
        readingRoomCarouselPrev: "Previous card",
        readingRoomCarouselNext: "Next card",
        heroIntroArchive: "The process of archiving these “illness narratives” was motivated by the gap in Macedonian scholarly and literary history that had neglected the existence of these genres. For that reason, this project was both a scientific and a creative endeavour: creating a space where the voices of the invisible could be heard and where experiences of illness could stand as stories with their own worth. With that commitment and scholarly responsibility, this archive became a scholarly document and educational resource — and a deeper, humanistic act.",
        heroSub: "The first bibliography of illness narratives in Macedonian literature — voices of patients, parents, and families",
        browseArchive: "Browse the Archive",
        aboutProject: "About This Project",
        legendLabel: "The colours of illness — each hue carries a story",
        legendQuotesTitle: "Voices from the Silence",
        illnessChildhoodCancer: "Childhood cancer",
        illnessChildhoodCancerDesc: "This yellow tone highlights childhood voices, family care, and the struggle of early suffering.",
        illnessBreastCancer: "Breast cancer",
        illnessBreastCancerDesc: "Pink marks narratives about the body, women's experience, vulnerability, and resistance.",
        illnessCancerGeneral: "Cancer general",
        illnessCancerGeneralDesc: "The neutral shade gathers stories of diagnosis, treatment, and existential uncertainty.",
        illnessMental: "Mental illness",
        illnessMentalDesc: "Green points to accounts of psychic crisis, stigma, and inner survival.",
        illnessAnxiety: "Anxiety / PTSD",
        illnessAnxietyDesc: "This blue shade follows trauma, unrest, memory, and a constant state of alertness.",
        illnessAlz: "Alzheimer's",
        illnessAlzDesc: "Purple signals the erosion of memory, identity, and family relationships.",
        illnessLeukemia: "Leukemia",
        illnessLeukemiaDesc: "Orange carries a feeling of urgency, medical struggle, and long-term care.",
        illnessPain: "Chronic pain",
        illnessPainDesc: "Red emphasizes the daily duration of pain and life lived within constant limitation.",
        illnessGrief: "Grief / Palliative",
        illnessGriefDesc: "This deep blue shade speaks of loss, end-of-life care, and quiet closeness.",
        illnessRare: "Rare diseases",
        illnessRareDesc: "The zebra motif represents rare conditions and experiences that often remain unseen.",
        archiveTitle: "The Archive",
        filterAll: "All",
        filterAutobiography: "Autobiography",
        filterFamily: "Family narrative",
        filterFiction: "Fiction",
        filterPoetry: "Poetry",
        addBookToggle: "+ Add book",
        deleteBookToggle: "Delete book",
        addBookNote: "Temporary: This browser form allows adding books and can be removed when the website is final.",
        labelTitle: "Title",
        labelAuthor: "Author and year",
        labelType: "Type",
        labelIllnessKey: "Illness key (for orb filters)",
        labelColor: "Color",
        labelTags: "Tags (comma separated)",
        labelDescription: "Short description",
        saveBook: "Save book",
        readMore: "Read more",
        aboutStripTitle: "The <em>first archive</em> of its kind in Macedonian literature",
        aboutStripText: "This bibliography gathers autobiographies, family narratives, fiction, and poetry — stories that have never before been catalogued as a body of medical humanities literature. It is a contribution to Macedonian literary studies, to digital medical humanities, and to the preservation of collective memory.",
        readMethodology: "Read the full methodology",
        footerCopy: "© 2025 · First Archive · Medical Humanities · North Macedonia"
      }
    },
    corpus: {
      mk: {
        navHome: "Дома",
        navCorpus: "Корпус",
        navBiography: "ДОБРЕДОЈДОВТЕ ВО ХОЛАНДИЈА",
        navMedicalHumanities: "Медицински хуманистики",
        navNarrativeMedicine: "Наративна медицина",
        navAboutSite: "За истражувањето",
        navAboutAuthor: "За авторката",
        navContact: "Контакт",
        navScrollBrand: "Гласови на телото",
        corpusPageTitle: "КОРПУС",
        corpusFilterLabel: "Филтер по тип",
        corpusSortLabel: "Сортирање",
        corpusSortTitleAsc: "Наслов А-Ш",
        corpusSortTitleDesc: "Наслов Ш-А",
        corpusSortAuthorAsc: "Автор А-Ш",
        corpusBackToCatalog: "← Назад кон корпус",
        corpusFieldTitle: "Наслов на книга:",
        corpusFieldAuthor: "Автор:",
        corpusFieldDescription: "Опис:",
        corpusFieldPublisher: "Издавач:",
        corpusReadMore: "Прочитај повеќе",
        corpusCobiss: "COBISS запис",
        corpusModalPrev: "Претходна книга",
        corpusModalNext: "Следна книга",
        filterAll: "Сите",
        filterAutobiography: "Автобиографија",
        filterFamily: "Семејна нарација",
        filterFiction: "Фикција",
        filterPoetry: "Поезија",
        footerCopy: "© 2025 · Прва архива · Медицинска хуманистика · Северна Македонија"
      },
      en: {
        navHome: "Home",
        navCorpus: "Corpus",
        navBiography: "Welcome To Holland",
        navMedicalHumanities: "Medical Humanities",
        navNarrativeMedicine: "Narrative Medicine",
        navAboutSite: "About the research",
        navAboutAuthor: "About the author",
        navContact: "Contact",
        navScrollBrand: "Voices of the body",
        corpusPageTitle: "CORPUS",
        corpusFilterLabel: "Filter by type",
        corpusSortLabel: "Sort",
        corpusSortTitleAsc: "Title A-Z",
        corpusSortTitleDesc: "Title Z-A",
        corpusSortAuthorAsc: "Author A-Z",
        corpusBackToCatalog: "← Back to corpus",
        corpusFieldTitle: "Book title:",
        corpusFieldAuthor: "Author:",
        corpusFieldDescription: "Description:",
        corpusFieldPublisher: "Publisher:",
        corpusReadMore: "Read more",
        corpusCobiss: "COBISS record",
        corpusModalPrev: "Previous book",
        corpusModalNext: "Next book",
        filterAll: "All",
        filterAutobiography: "Autobiography",
        filterFamily: "Family narrative",
        filterFiction: "Fiction",
        filterPoetry: "Poetry",
        footerCopy: "© 2025 · First Archive · Medical Humanities · North Macedonia"
      }
    },
    about: {
      mk: {
        navHome: "Дома",
        navCorpus: "Корпус",
        navBiography: "ДОБРЕДОЈДОВТЕ ВО ХОЛАНДИЈА",
        navMedicalHumanities: "Медицински хуманистики",
        navNarrativeMedicine: "Наративна медицина",
        navAboutSite: "За истражувањето",
        navAboutAuthor: "За авторката",
        navContact: "Контакт",
        navScrollBrand: "Гласови на телото",
        aboutPageH1: "За истражувањето",
        aboutIntroHeading: "За истражувањето и архивата",
        aboutIntroP1:
          "Истражувањето „Гласови на телото: Архиви на сведоштва (патографија и фикција)“ е дел од проектот „Траумата во литературата“, реализиран од Институтот за македонска литература, со поддршка на Министерството за образование и наука. Раководител на проектот беше проф. д-р Ана Мартиноска. Дел од резултатите од ова истражување ќе бидат претставени во научен труд, во зборникот трудови на овој проект. Овој материјал претставува негова дигитална истражувачка надградба, оформена како отворена онлајн архива наменета за натамошно истражување и размена на знаење.",
        aboutIntroP2:
          "Процесот на архивирање на овие „гласови на телото“ беше мотивиран од празнината која постоеше во македонската научна и книжевна историја, а која го имаше занемарено постоењето на овие жанрови. Од овие причини, ова истражување беше и научен и креативен процес на создање простор каде ќе се слушнат гласовите на невидливите и каде искуствата од болеста, попреченоста и невродивергентноста ќе бидат приказна која има своја вредност. Имајќи ја таа морална обврска и научна одговорност, оваа архива се претвори во научен документ, едукативен материјал, но и во подлабок, хуманистички чин.",
        aboutIntroP3:
          "Овие текстови се јавни сведоштва на лична, преживеана траума и претставуваат еден вид репозиториум на лични сеќавања. Авторите на овие сведоштва пишуваат со сопствена, интуитивна и емотивна логика на изразување, во форма на романи, раскази, документарна проза, мемоари, писма и дневници и во различни жанровски формации (патографија, автопатографија или хетеропатографија), хибридна автофикција, автофикциска патографија и полифонични (колективни) сведоштва. Нивните приказни се огледало на интимните доживувања од соочувањето и прифаќањето на новата стварност, но и на општеството, обременето со предрасуди, незнаење, стигма и недоволно разбирање.",
        aboutIntroP5:
          "Од овие причини, процесот на книжевно архивирање на овие текстови се фокусираше на пошироката книжевна, документарна, етичка и хуманистичка вредност, што ја надминува естетската проценка. Нараторите на овие приказни се гласови што треба да се слушнат. Насловните страни, библиографските податоци и цитатните фрагменти се прикажани исклучиво за научноистражувачки, едукативни и книжевно-аналитички  цели.",
        aboutCuratorHeading: "За авторката на архивата",
        aboutCuratorP1:
          "Д-р Тамара Ќупева е виша научна соработничка во Институтот за македонска литература, Универзитет „Св. Кирил и Методиј“ во Скопје. Нејзиниот научноистражувачки и професионален ангажман се движи на пресекот меѓу книжевноста, образованието и современите медиуми, со особен интерес за дигитална хуманистика, медицинска хуманистика, вештачка интелигенција и трансформацијата на знаењето во дигиталната ера.",
        aboutCuratorP2:
          "Авторка е на научни трудови, монографии и прирачници посветени на литературата, педагогијата и комуникацијата. Како предавачка и обучувачка, има долгогодишно искуство во развој и имплементација на едукативни програми, особено во областа на медиумската писменост, каде работи со наставници, ученици и пошироката јавност. Нејзиниот професионален профил вклучува и ангажман во креирање образовни политики и реформи, како и активно учество во академски и институционални тела.",
        quoteText: "\"За да ја олесниме болеста, мора прво да ја ослободиме нејзината приказна.\"",
        footerCopy: "© 2025 · Прва архива · Медицинска хуманистика · Северна Македонија"
      },
      en: {
        navHome: "Home",
        navCorpus: "Corpus",
        navBiography: "Welcome To Holland",
        navMedicalHumanities: "Medical Humanities",
        navNarrativeMedicine: "Narrative Medicine",
        navAboutSite: "About the research",
        navAboutAuthor: "About the author",
        navContact: "Contact",
        navScrollBrand: "Voices of the body",
        aboutPageH1: "About the research",
        aboutIntroHeading: "About the research and the archive",
        aboutIntroP1:
          "The study “Voices of the Body — Archives of Testimony” (pathography and fiction) is part of the project “Trauma in Literature”, carried out by the Institute of Macedonian Literature with support from the Ministry of Education and Science. The project was led by Prof. Dr Ana Martinoska. Some of the results were published as academic work in the project’s anthology. This resource is its digital extension — an open online archive aimed at ongoing research and the exchange of knowledge.",
        aboutIntroP2:
          "The process of archiving these “voices of the body” was motivated by the gap in Macedonian scholarly and literary history that had neglected the existence of these genres. For these reasons, this research was both a scientific and a creative process of creating a space where the voices of the invisible could be heard and where experiences of illness, disability, and neurodiversity could be stories with their own worth. With that moral obligation and scholarly responsibility, this archive became a scholarly document, educational material, and also a deeper humanistic act.",
        aboutIntroP3:
          "These texts are public testimonies of personal, lived trauma and represent a kind of repository of personal memory. The authors of these testimonies write with their own intuitive and emotional logic of expression, in the form of novels, short stories, documentary prose, memoirs, letters, and diaries and in different generic formations (pathography, autopathography or heteropathography), hybrid autofiction, pathographic fiction, and polyphonic (collective) testimonies, and their stories are a mirror of the intimate experiences of confronting and accepting a new reality, but also of a society burdened by prejudice, ignorance, stigma, and insufficient understanding.",
        aboutIntroP5:
          "For these reasons, the process of literary archiving of these texts focused on the broader literary, documentary, ethical, and humanistic value that goes beyond aesthetic judgement. The narrators of these stories are voices that deserve to be heard.",
        aboutCuratorHeading: "About the curator",
        aboutCuratorP1:
          "Dr Tamara Kjupeva is a senior research associate at the Institute of Macedonian Literature, Ss. Cyril and Methodius University in Skopje. She works as a researcher in the Department of Bibliography, Documentation, Library and Informatics. Her scholarly and professional engagement lies at the intersection of literature, education, and contemporary media, with a particular interest in digital humanities, medical humanities, artificial intelligence, and the transformation of knowledge in the digital era.",
        aboutCuratorP2:
          "She is the author of numerous scholarly papers, books, monographs, and bibliographies devoted to literature, pedagogy, communication, and media literacy, and she actively takes part in national and international research projects, conferences, and scholarly symposia. As a lecturer and trainer, she has long-standing experience in developing and implementing educational programmes, especially in media literacy, working with teachers, students, and the wider public. Her professional profile also includes work on educational policy and reform, and active participation in academic and institutional bodies.",
        quoteText: "\"To relieve an illness, one must begin by unburdening its story.\"",
        footerCopy: "© 2025 · First Archive · Medical Humanities · North Macedonia"
      }
    },
    biography: {
      mk: {
        navHome: "Дома",
        navCorpus: "Корпус",
        navBiography: "ДОБРЕДОЈДОВТЕ ВО ХОЛАНДИЈА",
        navAboutSite: "За истражувањето",
        navAboutAuthor: "За авторката",
        navContact: "Контакт",
        navScrollBrand: "Гласови на телото",
        biographyPageTitle: "ДОБРЕДОЈДОВТЕ ВО ХОЛАНДИЈА",
        footerCopy: "© 2025 · Прва архива · Медицинска хуманистика · Северна Македонија"
      },
      en: {
        navHome: "Home",
        navCorpus: "Corpus",
        navBiography: "Welcome To Holland",
        navAboutSite: "About the research",
        navAboutAuthor: "About the author",
        navContact: "Contact",
        navScrollBrand: "Voices of the body",
        biographyPageTitle: "Welcome To Holland",
        footerCopy: "© 2025 · First Archive · Medical Humanities · North Macedonia"
      }
    },
    story: {
      mk: {
        navHome: "Дома",
        navCorpus: "Корпус",
        navBiography: "ДОБРЕДОЈДОВТЕ ВО ХОЛАНДИЈА",
        navMedicalHumanities: "Медицински хуманистики",
        navNarrativeMedicine: "Наративна медицина",
        navAboutSite: "За истражувањето",
        navAboutAuthor: "За авторката",
        navContact: "Контакт",
        navScrollBrand: "Гласови на телото",
        breadcrumbArchive: "Архива",
        breadcrumbTitle: "Наслов на приказна",
        backToArchive: "← Назад кон архива",
        footerCopy: "© 2025 · Прва архива · Медицинска хуманистика · Северна Македонија"
      },
      en: {
        navHome: "Home",
        navCorpus: "Corpus",
        navBiography: "Welcome To Holland",
        navMedicalHumanities: "Medical Humanities",
        navNarrativeMedicine: "Narrative Medicine",
        navAboutSite: "About the research",
        navAboutAuthor: "About the author",
        navContact: "Contact",
        navScrollBrand: "Voices of the body",
        breadcrumbArchive: "Archive",
        breadcrumbTitle: "Story title here",
        backToArchive: "← Back to archive",
        footerCopy: "© 2025 · First Archive · Medical Humanities · North Macedonia"
      }
    },
    contact: {
      mk: {
        navHome: "Дома",
        navCorpus: "Корпус",
        navBiography: "ДОБРЕДОЈДОВТЕ ВО ХОЛАНДИЈА",
        navAboutSite: "За истражувањето",
        navAboutAuthor: "За авторката",
        navContact: "Контакт",
        navScrollBrand: "Наративи на болеста",
        contactHeroLead:
          "Доколку имате прашања за архивата, корпусот или истражувањето, пишете ни — со задоволство ќе одговориме.",
        contactHours: "Работни денови · по договор",
        contactMailBtn: "Пишете ни",
        contactCredentialsHeading: "КОНТАКТ",
        contactLinkedinLabel: "LinkedIn профил",
        contactCardEmailLabel: "Е-пошта",
        contactCardPhoneLabel: "Телефон",
        contactFormFirstLabel: "Име",
        contactFormLastLabel: "Презиме",
        contactFormEmailLabel: "Е-пошта",
        contactFormMessageLabel: "Порака:",
        contactFormSubmit: "Испрати порака",
        contactFormSuccess:
          "Пораката е испратена. Ви благодариме — наскоро ќе ве контактираме.",
        footerCopy: "© 2025 · Прва архива · Медицинска хуманистика · Северна Македонија"
      },
      en: {
        navHome: "Home",
        navCorpus: "Corpus",
        navBiography: "Welcome To Holland",
        navAboutSite: "About the research",
        navAboutAuthor: "About the author",
        navContact: "Contact",
        navScrollBrand: "Narratives of Illness",
        contactHeroLead:
          "If you have questions about the archive, the corpus, or the research, write to us — we will be glad to respond.",
        contactHours: "Weekdays · by arrangement",
        contactMailBtn: "Email us",
        contactCredentialsHeading: "CONTACT",
        contactLinkedinLabel: "LinkedIn profile",
        contactCardEmailLabel: "Email",
        contactCardPhoneLabel: "Phone",
        contactFormFirstLabel: "First name",
        contactFormLastLabel: "Last name",
        contactFormEmailLabel: "Email",
        contactFormMessageLabel: "Message:",
        contactFormSubmit: "Send message",
        contactFormSuccess:
          "Your message has been sent. Thank you — we will get back to you soon.",
        footerCopy: "© 2025 · First Archive · Medical Humanities · North Macedonia"
      }
    },
    author: {
      mk: {
        navHome: "Дома",
        navCorpus: "Корпус",
        navBiography: "ДОБРЕДОЈДОВТЕ ВО ХОЛАНДИЈА",
        navMedicalHumanities: "Медицински хуманистики",
        navNarrativeMedicine: "Наративна медицина",
        navAboutSite: "За истражувањето",
        navAboutAuthor: "За авторката",
        navContact: "Контакт",
        navScrollBrand: "Гласови на телото",
        authorPageH1: "За авторката",
        authorP1:
          "Д-р Тамара Ќупева е виша научна соработничка во Институт за македонска литература, Универзитетот „Св. Кирил и Методиј“ во Скопје. Нејзиниот научноистражувачки и професионален ангажман се движи на пресекот меѓу книжевноста, образованието и современите медиуми, со особен интерес за дигитална хуманистика, медицинска хуманистика, вештачка интелигенција и трансформацијата на знаењето во дигиталната ера.",
        authorP2:
          "Авторка е на научни трудови, монографии и прирачници посветени на литературата, педагогијата, комуникацијата и медиумската писменост. Како предавачка и обучувачка, има долгогодишно искуство во развој и имплементација на едукативни програми, особено во областа на медиумската писменост. Нејзиниот професионален профил вклучува и ангажман во креирање образовни политики и реформи, како и активно учество во академски и институционални тела.",
        footerCopy: "© 2025 · Прва архива · Медицинска хуманистика · Северна Македонија"
      },
      en: {
        navHome: "Home",
        navCorpus: "Corpus",
        navBiography: "Welcome To Holland",
        navMedicalHumanities: "Medical Humanities",
        navNarrativeMedicine: "Narrative Medicine",
        navAboutSite: "About the research",
        navAboutAuthor: "About the author",
        navContact: "Contact",
        navScrollBrand: "Voices of the body",
        authorPageH1: "About the author",
        authorP1:
          "Dr Tamara Kjupeva is a senior research associate at the Institute of Macedonian Literature, Ss. Cyril and Methodius University in Skopje. She works as a researcher in the Department of Bibliography, Documentation, Library and Informatics. Her research and professional work lie at the intersection of literature, education, and contemporary media, with a particular interest in digital humanities, medical humanities, artificial intelligence, and the transformation of knowledge in the digital era.",
        authorP2:
          "She is the author of numerous scholarly papers, books, monographs, and bibliographies devoted to literature, pedagogy, communication, and media literacy, and she actively participates in national and international research projects, conferences, and scholarly symposia. As a lecturer and trainer, she has long-standing experience in developing and implementing educational programmes, especially in media literacy. Her professional profile also includes engagement in shaping educational policy and reform, as well as active participation in academic and institutional bodies.",
        footerCopy: "© 2025 · First Archive · Medical Humanities · North Macedonia"
      }
    }
  };

  function applyLanguage(lang) {
    const data = dict[page] && dict[page][lang];
    if (!data) return;
    localStorage.setItem("siteLang", lang);
    document.documentElement.lang = lang === "mk" ? "mk" : "en";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (!data[key]) return;
      if (data[key].indexOf("<") >= 0) {
        el.innerHTML = data[key];
      } else {
        const next = data[key];
        if (el.textContent.trim() !== next) {
          el.textContent = next;
        }
      }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-aria");
      if (!data[key]) return;
      el.setAttribute("aria-label", data[key]);
    });

    document.querySelectorAll(".hero-title-glitch").forEach(function (el) {
      el.setAttribute("data-text", el.textContent.trim());
    });

    document.dispatchEvent(new CustomEvent("languageChanged", { detail: { lang: lang } }));
  }

  const initialLang = localStorage.getItem("siteLang") || "mk";
  applyLanguage(initialLang);
})();
