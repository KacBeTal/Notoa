import { useEffect, useState, type ReactNode } from "react";

type Route = "home" | "privacy" | "terms";
type ScreenVariant = "home" | "lock" | "list" | "calendar" | "cloud";

const routeLabels: Record<Route, string> = {
  home: "Главная",
  privacy: "Конфиденциальность",
  terms: "Условия",
};

function getRoute(pathname = window.location.pathname): Route {
  const cleanPath = pathname.replace(/\/+$/, "") || "/";

  if (cleanPath === "/privacy" || cleanPath === "/privacy.html") return "privacy";
  if (cleanPath === "/terms" || cleanPath === "/terms.html") return "terms";
  return "home";
}

function navigate(to: string) {
  window.history.pushState({}, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function RouteLink({
  to,
  children,
  className = "",
  onClick,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={to}
      className={className}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        onClick?.();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M3 15 15 3M7 3h8v8" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M9 2v9m0 0 3.5-3.5M9 11 5.5 7.5M3 14.5h12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="m3.5 9.5 3.2 3.2L14.5 5" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3M9 15h.01M12 15h.01M15 15h.01" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.5 18.5h9.2a4.3 4.3 0 0 0 .8-8.53A6.2 6.2 0 0 0 5.6 11.8a3.38 3.38 0 0 0 1.9 6.7Z" />
      <path d="M12 12v6m0 0 2.3-2.3M12 18l-2.3-2.3" />
    </svg>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <RouteLink to="/" className={`brand ${compact ? "brand-compact" : ""}`}>
      <span className="brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="brand-name">Notoria</span>
      {!compact && <span className="brand-caption">личный блокнот</span>}
    </RouteLink>
  );
}

function SiteFrame({ active, children }: { active: Route; children: ReactNode }) {
  return (
    <div className="site-shell">
      <aside className="notebook-rail" aria-label="Основная навигация">
        <div className="rail-cap">
          <span />
          <span />
          <span />
        </div>
        <div className="rail-bindings" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="rail-bottom">N / 01</div>
      </aside>

      <div className="page-column">
        <header className="topbar">
          <Brand />
          <nav className="main-nav" aria-label="Разделы сайта">
            {(Object.keys(routeLabels) as Route[]).map((route) => {
              const href = route === "home" ? "/" : `/${route}`;
              return (
                <RouteLink key={route} to={href} className={active === route ? "active" : ""}>
                  <span className="nav-index">0{route === "home" ? 1 : route === "privacy" ? 2 : 3}</span>
                  {routeLabels[route]}
                </RouteLink>
              );
            })}
          </nav>
          <span className="top-version">v1.1.1</span>
        </header>
        {children}
      </div>
    </div>
  );
}

function AppScreen({ variant }: { variant: ScreenVariant }) {
  if (variant === "lock") {
    return (
      <div className="screen-preview screen-lock" role="img" aria-label="Экран блокировки Notoria с PIN-кодом">
        <div className="screen-status">9:41 <span>•••</span></div>
        <div className="lock-content">
          <span className="screen-app-mark">N</span>
          <strong>Добро пожаловать</strong>
          <span>Введите PIN-код</span>
          <div className="pin-dots"><i /><i /><i /><i /></div>
          <div className="pin-pad"><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i><i>6</i><i>7</i><i>8</i><i>9</i></div>
        </div>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className="screen-preview screen-list" role="img" aria-label="Список дел в приложении Notoria">
        <div className="screen-status">9:41 <span>•••</span></div>
        <div className="screen-heading"><span>Мои записи</span><b>+</b></div>
        <div className="screen-tabs"><b>Все</b><span>Избранное</span></div>
        <div className="screen-date">СЕГОДНЯ · 12 ИЮНЯ</div>
        <div className="note-row marked"><span className="check checked"><CheckIcon /></span><div><b>Купить продукты</b><small>Молоко, хлеб, зеленый чай</small></div></div>
        <div className="note-row"><span className="check" /><div><b>Идеи для проекта</b><small>Заметка · 4 пункта</small></div></div>
        <div className="note-row"><span className="check" /><div><b>Позвонить маме</b><small>Напоминание · 18:30</small></div></div>
        <div className="screen-nav"><span className="selected">Заметки</span><span>Календарь</span><span>Настройки</span></div>
      </div>
    );
  }

  if (variant === "calendar") {
    return (
      <div className="screen-preview screen-calendar" role="img" aria-label="Календарь с заметками в приложении Notoria">
        <div className="screen-status">9:41 <span>•••</span></div>
        <div className="screen-heading"><span>Июнь 2026</span><b>⌄</b></div>
        <div className="calendar-week"><i>ПН</i><i>ВТ</i><i>СР</i><i>ЧТ</i><i>ПТ</i><i>СБ</i><i>ВС</i></div>
        <div className="calendar-days">{Array.from({ length: 35 }, (_, index) => <i key={index} className={index === 15 ? "today" : index === 18 || index === 23 ? "has-note" : ""}>{index < 3 ? "" : ((index - 2) % 30) + 1}</i>)}</div>
        <div className="calendar-note"><span className="tiny-dot" /><div><b>Сегодня</b><small>Подготовить список дел</small></div><span>14:00</span></div>
        <div className="screen-nav"><span>Заметки</span><span className="selected">Календарь</span><span>Настройки</span></div>
      </div>
    );
  }

  if (variant === "cloud") {
    return (
      <div className="screen-preview screen-cloud" role="img" aria-label="Резервное копирование Notoria">
        <div className="screen-status">9:41 <span>•••</span></div>
        <div className="screen-heading"><span>Резервная копия</span><b>×</b></div>
        <div className="cloud-illustration"><CloudIcon /><span>Всё сохранено</span></div>
        <p>Последняя копия создана<br /><b>сегодня в 09:32</b></p>
        <div className="cloud-option"><span className="service-dot google">G</span><div><b>Google Drive</b><small>Подключен</small></div><span className="cloud-check"><CheckIcon /></span></div>
        <div className="cloud-option muted"><span className="service-dot yandex">Я</span><div><b>Яндекс.Диск</b><small>Не подключен</small></div><span className="cloud-arrow"><ArrowIcon /></span></div>
        <button type="button" className="screen-action">Создать копию</button>
      </div>
    );
  }

  return (
    <div className="screen-preview screen-home" role="img" aria-label="Лента заметок Notoria">
      <div className="screen-status">9:41 <span>•••</span></div>
      <div className="screen-heading"><span>Добрый день, Аня</span><span className="avatar">А</span></div>
      <div className="screen-greeting">Что сегодня<br /><b>хочется записать?</b></div>
      <div className="screen-search"><span>⌕</span> Найти заметку</div>
      <div className="screen-label">ПОСЛЕДНИЕ ЗАМЕТКИ</div>
      <div className="home-note peach"><b>Маленькие шаги</b><small>«Необязательно видеть всю лестницу...»</small><span>12 ИЮНЯ · #мысли</span></div>
      <div className="home-note blue"><b>Планы на неделю</b><small>Собрать идеи и выбрать главное</small><span>11 ИЮНЯ · #планы</span></div>
      <div className="screen-nav"><span className="selected">Заметки</span><span>Календарь</span><span>Настройки</span></div>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual" aria-label="Предпросмотр приложения Notoria">
      <div className="visual-shadow" />
      <div className="hero-sheet">
        <div className="sheet-topline"><span>NOTORIA / ПРЕДПРОСМОТР</span><span>01</span></div>
        <div className="hero-screen-wrap"><AppScreen variant="home" /></div>
        <div className="sheet-footline"><span>мысли · планы · заметки</span><span>offline first</span></div>
      </div>
      <div className="paper-hole hole-one" />
      <div className="paper-hole hole-two" />
    </div>
  );
}

const galleryItems: { variant: ScreenVariant; title: string; detail: string; number: string }[] = [
  { variant: "lock", number: "01", title: "Тишина внутри", detail: "PIN-код и графический ключ защищают личное." },
  { variant: "list", number: "02", title: "Держать фокус", detail: "Заметки, списки и идеи в одном спокойном месте." },
  { variant: "calendar", number: "03", title: "Поймать момент", detail: "Планы и напоминания всегда перед глазами." },
  { variant: "cloud", number: "04", title: "Сохранить важное", detail: "Резервная копия только тогда, когда она нужна вам." },
];

function HomePage() {
  return (
    <SiteFrame active="home">
      <main>
        <section className="hero content-width" id="top">
          <div className="hero-copy">
            <p className="eyebrow">01 / личный блокнот</p>
            <h1>Notoria<br /><em>для мыслей,</em><br />которые важны.</h1>
            <p className="hero-lede">Простое место для заметок, дневника и задач. Без рекламы, без лишнего шума и с уважением к вашей приватности.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#download"><DownloadIcon /> Скачать приложение</a>
              <a className="text-link" href="#screens">Посмотреть возможности <ArrowIcon /></a>
            </div>
          </div>
          <HeroVisual />
        </section>

        <section className="intro-strip content-width" aria-label="Принципы Notoria">
          <div className="strip-mark">N<span /></div>
          <p>Notoria создана вокруг одной идеи: <strong>ваши записи должны оставаться вашими.</strong> Поэтому приложение работает офлайн, а облачное копирование включается только по вашему желанию.</p>
          <span className="strip-note">made for quiet days</span>
        </section>

        <section className="content-width section-block" id="screens">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / внутри приложения</p>
              <h2>Спокойный интерфейс<br /><em>для живых мыслей.</em></h2>
            </div>
            <p>Каждый экран помогает сосредоточиться на содержании, а не на настройках. Вот как выглядит Notoria в работе.</p>
          </div>
          <div className="gallery-grid">
            {galleryItems.map((item) => (
              <figure className="gallery-item" key={item.variant}>
                <div className="gallery-screen"><AppScreen variant={item.variant} /></div>
                <figcaption><span>{item.number}</span><div><strong>{item.title}</strong><small>{item.detail}</small></div></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="content-width section-block features-block">
          <div className="section-heading compact-heading">
            <div>
              <p className="eyebrow">03 / всё нужное</p>
              <h2>Ничего лишнего.</h2>
            </div>
            <p>Функции собраны вокруг ежедневных привычек, а не вокруг бесконечных меню.</p>
          </div>
          <div className="feature-list">
            <div className="feature-row"><span>01</span><strong>Заметки и дневник</strong><p>Мысли, идеи, фото и длинные записи без ограничений.</p></div>
            <div className="feature-row"><span>02</span><strong>Теги и поиск</strong><p>Цветные метки и быстрый поиск помогают найти нужное.</p></div>
            <div className="feature-row"><span>03</span><strong>Задачи и календарь</strong><p>Списки с чекбоксами, даты и локальные напоминания.</p></div>
            <div className="feature-row"><span>04</span><strong>Архив и корзина</strong><p>Уберите запись с глаз, не теряя возможности вернуть её.</p></div>
            <div className="feature-row"><span>05</span><strong>Офлайн и тёмная тема</strong><p>Работайте без интернета в удобное время суток.</p></div>
            <div className="feature-row"><span>06</span><strong>Виджет на экране</strong><p>Важная заметка остаётся рядом, когда это действительно нужно.</p></div>
          </div>
        </section>

        <section className="privacy-note content-width">
          <div className="privacy-icon"><LockIcon /></div>
          <div><p className="eyebrow">приватность по умолчанию</p><h2>Ваши данные не становятся<br /><em>чьим-то бизнесом.</em></h2><p>Записи хранятся на вашем устройстве. В Notoria нет рекламы, трекеров и аналитических SDK. Google Drive и Яндекс.Диск подключаются только вами.</p></div>
          <RouteLink to="/privacy" className="text-link light-link">Читать политику <ArrowIcon /></RouteLink>
        </section>

        <section className="download-section content-width" id="download">
          <div className="download-copy">
            <p className="eyebrow">04 / установить Notoria</p>
            <h2>Ваш следующий<br /><em>чистый лист.</em></h2>
            <p>Скачайте приложение напрямую или установите его из RuStore. Google Play появится совсем скоро.</p>
          </div>
          <div className="download-actions">
            <a className="store-button store-apk" href="https://github.com/KacBeTal/Notoa/releases/download/1.1.1/1.1.1.apk">
              <span className="store-icon"><DownloadIcon /></span><span><small>Прямая ссылка</small><strong>Скачать APK <b>1.1.1</b></strong></span><ArrowIcon />
            </a>
            <a className="store-button store-rustore" href="https://www.rustore.ru/catalog/app/app.blocknot.offline" target="_blank" rel="noreferrer">
              <span className="store-icon store-letter">R</span><span><small>Официальный магазин</small><strong>Открыть в RuStore</strong></span><ArrowIcon />
            </a>
            <div className="store-button store-soon" aria-disabled="true">
              <span className="store-icon play-triangle" /><span><small>Официальный магазин</small><strong>Google Play <b>скоро</b></strong></span><span className="soon-dot">·</span>
            </div>
          </div>
        </section>

        <section className="content-width release-section">
          <div><p className="eyebrow">05 / история</p><h2>Что нового</h2></div>
          <div className="release-list">
            <div className="release-entry current"><span>1.1.1</span><strong>Сейчас</strong><p>Исправлены баги и недочёты.</p></div>
            <div className="release-entry"><span>1.1.0</span><strong>Релиз</strong><p>Три языка интерфейса, импорт и экспорт, обновлённый раздел безопасности.</p></div>
            <div className="release-entry"><span>1.0.0</span><strong>Релиз</strong><p>Полный первый релиз приложения.</p></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </SiteFrame>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer content-width">
      <div><Brand compact /><p>Личный блокнот, который остаётся личным.</p></div>
      <div className="footer-links"><RouteLink to="/privacy">Конфиденциальность</RouteLink><RouteLink to="/terms">Условия</RouteLink><a href="https://github.com/KacBeTal/Notoa" target="_blank" rel="noreferrer">GitHub</a></div>
      <div className="footer-bottom"><span>© 2026 Notoria</span><a href="mailto:kacbetal.posts@gmail.com">kacbetal.posts@gmail.com</a></div>
    </footer>
  );
}

const privacySections = [
  { title: "Ваши записи", body: <>Заголовки, текст, теги, вложения (фото, файлы) и даты создания или изменения хранятся локально, на вашем устройстве. Разработчик не имеет к ним доступа и не собирает их на своих серверах — сервера для этого попросту не используются.</> },
  { title: "PIN-код и графический ключ", body: <>Если вы включаете блокировку экрана в приложении, код или графический ключ сохраняется локально в хэшированном виде и используется только для разблокировки на этом устройстве. Он никуда не передаётся.</> },
  { title: "Резервное копирование через Google Drive и Яндекс.Диск", body: <><p>Обе функции выключены по умолчанию и независимы друг от друга. Если вы их включаете:</p><ul><li>Приложение запрашивает вход через ваш аккаунт Google или Яндекс и доступ с ограниченной областью действия. Для Google Drive это область <code>drive.file</code> — приложение видит и может изменять только те файлы, которые само создало. Для Яндекс.Диска действует аналогичный принцип: приложение работает только со своей папкой резервных копий.</li><li>Данные передаются напрямую между вашим устройством и серверами Google или Яндекса. Разработчик не получает и не хранит копию этой информации.</li><li>Отозвать доступ можно в любой момент в приложении или в настройках соответствующего аккаунта — <a href="https://myaccount.google.com/permissions" target="_blank" rel="noreferrer">myaccount.google.com/permissions</a> для Google.</li></ul></> },
  { title: "Напоминания и уведомления", body: <>Записи в календаре могут сопровождаться локальными напоминаниями. Уведомления формируются и показываются самим устройством, без обращения к серверам разработчика.</> },
  { title: "Проверка обновлений", body: <>Периодически приложение обращается к публичному репозиторию проекта на GitHub, чтобы проверить наличие новой версии. Запрос не содержит личных данных и не идентифицирует пользователя.</> },
  { title: "Установка обновлений", body: <>Приложение может запросить разрешение на установку пакетов, чтобы вы могли вручную установить обновление, скачанное из репозитория проекта, после вашего подтверждения.</> },
  { title: "Реклама и аналитика", body: <>В приложении нет рекламы, трекеров и аналитических SDK.</> },
  { title: "Передача данных третьим лицам", body: <>Мы не продаём и не передаём ваши данные третьим лицам. Единственные интеграции со сторонними сервисами — Google Drive и Яндекс.Диск, и только по вашей инициативе.</> },
  { title: "Удаление данных", body: <>Удаление приложения или очистка его данных в настройках устройства удаляет все локально хранимые записи, включая архив и корзину. Резервная копия в Google Drive или на Яндекс.Диске удаляется отдельно — вручную, из соответствующего аккаунта.</> },
  { title: "Дети", body: <>Приложение не предназначено для детей младше 13 лет, и мы сознательно не собираем данные от детей.</> },
  { title: "Изменения политики", body: <>При существенных изменениях мы обновим дату в начале этой страницы.</> },
  { title: "Контакты", body: <>По вопросам, связанным с этой политикой, пишите: <a href="mailto:kacbetal.posts@gmail.com">kacbetal.posts@gmail.com</a>.</> },
];

const termsSections = [
  { title: "Принятие условий", body: <>Устанавливая и используя приложение «Notoria», вы соглашаетесь с этими условиями. Если вы не согласны — пожалуйста, не используйте приложение.</> },
  { title: "Описание сервиса", body: <>«Notoria» — приложение для личных заметок, дневника и задач. Записи по умолчанию хранятся локально на устройстве; синхронизация с Google Drive и Яндекс.Диском — отдельные, необязательные функции.</> },
  { title: "Лицензия", body: <>Вам предоставляется личная, неисключительная и непередаваемая лицензия на использование приложения для собственных нужд.</> },
  { title: "Ваш контент", body: <>Вы несёте ответственность за содержимое своих записей, а также за сохранность резервных копий, в том числе созданных через Google Drive или Яндекс.Диск. Разработчик не имеет доступа к вашим записям и не может их восстановить, если вы не сохранили резервную копию сами.</> },
  { title: "Отказ от гарантий", body: <>Приложение предоставляется «как есть», без каких-либо гарантий, явных или подразумеваемых, включая гарантии пригодности для конкретной цели.</> },
  { title: "Ограничение ответственности", body: <>Разработчик не несёт ответственности за потерю данных — в том числе из-за удаления приложения, сбоя устройства, потери доступа к аккаунту Google или Яндекс, а также отзыва разрешений. Рекомендуем регулярно делать резервные копии.</> },
  { title: "Изменения и прекращение поддержки", body: <>Разработчик может обновлять приложение, изменять его функциональность или прекращать поддержку. Вы можете удалить приложение в любой момент.</> },
  { title: "Сторонние сервисы", body: <>Использование Google Drive и Яндекс.Диска регулируется собственными условиями и политиками конфиденциальности этих сервисов, независимо от этого документа.</> },
  { title: "Применимое право", body: <>Юрисдикцию и применимое право необходимо указать до публичного запуска приложения. До этого момента этот раздел требует уточнения.</> },
  { title: "Контакты", body: <>По вопросам, связанным с этими условиями, пишите: <a href="mailto:kacbetal.posts@gmail.com">kacbetal.posts@gmail.com</a>.</> },
];

function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const isPrivacy = kind === "privacy";
  const sections = isPrivacy ? privacySections : termsSections;
  const title = isPrivacy ? "Как мы обращаемся с вашими данными" : "Условия использования приложения «Notoria»";
  const intro = isPrivacy
    ? "Это приложение сделано так, чтобы ваши записи оставались у вас. Ниже — подробно, какие данные обрабатываются и почему."
    : "Коротко и без юридического тумана: что можно ожидать от приложения и за что отвечает сам пользователь.";

  return (
    <SiteFrame active={kind}>
      <main className="legal-page content-width">
        <div className="legal-header">
          <p className="eyebrow">DOC / 0{isPrivacy ? "2" : "3"}</p>
          <h1>{title}</h1>
          <p className="legal-intro">{intro}</p>
          <p className="legal-meta">Действует с 7 сентября 2026 г. <span>·</span> Последнее обновление</p>
        </div>
        <div className="legal-layout">
          <aside className="legal-index"><span>Содержание</span>{sections.map((section, index) => <a href={`#section-${index + 1}`} key={section.title}><b>{String(index + 1).padStart(2, "0")}</b>{section.title}</a>)}</aside>
          <article className="legal-content">
            {sections.map((section, index) => (
              <section className="legal-section" id={`section-${index + 1}`} key={section.title}>
                <h2><span>{String(index + 1).padStart(2, "0")}</span>{section.title}</h2>
                <div className="legal-body">{section.body}</div>
              </section>
            ))}
          </article>
        </div>
      </main>
      <SiteFooter />
    </SiteFrame>
  );
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => getRoute());

  useEffect(() => {
    const onPopState = () => setRoute(getRoute());
    window.addEventListener("popstate", onPopState);
    document.title = route === "home" ? "Notoria — личный блокнот и дневник" : `${routeLabels[route]} — Notoria`;
    document.documentElement.lang = "ru";
    return () => window.removeEventListener("popstate", onPopState);
  }, [route]);

  if (route === "privacy") return <LegalPage kind="privacy" />;
  if (route === "terms") return <LegalPage kind="terms" />;
  return <HomePage />;
}