/**
 * ATTT Services — Mobile booking UI (frontend only)
 * Load with React 18 UMD + ReactDOM 18 UMD + @babel/standalone (type="text/babel")
 * Tailwind CDN + DM Sans — see index.html
 */

const { useState, useEffect, useRef } = React;

const COLORS = {
  navyHeader: "#1B2A4A",
  primaryBlue: "#1B3A6B",
  accentOrange: "#F5A623",
  pageBg: "#F0F0EA",
  cardBg: "#FFFFFF",
  successGreen: "#4CAF7D",
  textPrimary: "#1A1A1A",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  refBlue: "#2563EB",
  warningBg: "#FFFBEB",
};

function formatVisitDateMay2026(day) {
  const d = new Date(2026, 4, day);
  const jours = ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."];
  return `${jours[d.getDay()]} ${day} mai 2026`;
}

function centerSummaryLine(centerList, centerId) {
  const c = centerList.find((x) => x.id === centerId);
  if (!c) return "—";
  const short = c.name.replace(/^Centre\s+/i, "").trim();
  return `${short}, Tunis`;
}

function Header({ title, showBack, onBack, variant = "default", onProfileTap }) {
  const isHome = variant === "home";
  const isConfirmation = variant === "confirmation";
  const showBrand = variant === "steps";

  return (
    <header
      className="w-full shrink-0 text-white px-4 flex items-center gap-3"
      style={{
        backgroundColor: COLORS.navyHeader,
        minHeight: 56,
        paddingTop: isHome ? 20 : 0,
      }}
    >
      <div className="w-10 flex justify-start shrink-0">
        {showBack && !isConfirmation && (
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
            aria-label="Retour"
          >
            <span className="text-xl leading-none">‹</span>
          </button>
        )}
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center min-w-0">
        {isHome ? (
          <>
            <p
              className="text-white/90"
              style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.2 }}
            >
              Bienvenue
            </p>
            <h1
              className="text-white font-semibold"
              style={{ fontSize: 18, lineHeight: 1.25 }}
            >
              ATTT Services
            </h1>
          </>
        ) : (
          <h1
            className="text-white font-semibold truncate w-full"
            style={{ fontSize: 17 }}
          >
            {title}
          </h1>
        )}
      </div>
      <div className="w-10 flex justify-end shrink-0">
        {isHome && (
          <button
            type="button"
            onClick={onProfileTap}
            className="h-9 w-9 rounded-full flex items-center justify-center shrink-0 border-0 p-0 cursor-pointer"
            style={{ backgroundColor: "#9CA3AF" }}
            aria-label="Profil"
          >
            <span className="text-white text-lg">👤</span>
          </button>
        )}
        {showBrand && (
          <span
            className="text-white font-semibold tracking-wide"
            style={{ fontSize: 13 }}
          >
            ATTT
          </span>
        )}
      </div>
    </header>
  );
}

function StepBar({ current }) {
  const line = (
    <div
      className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 z-0"
      style={{ backgroundColor: COLORS.border }}
    />
  );

  const StepDot = ({ n }) => {
    const done = current > n;
    const active = current === n;
    return (
      <div className="relative z-10 flex flex-col items-center">
        <div
          className="flex items-center justify-center rounded-full font-semibold"
          style={{
            width: 32,
            height: 32,
            fontSize: 14,
            backgroundColor: done
              ? COLORS.primaryBlue
              : active
                ? COLORS.accentOrange
                : "#FFFFFF",
            color: done || active ? "#FFFFFF" : COLORS.textSecondary,
            border:
              done || active ? "none" : `2px solid ${COLORS.border}`,
          }}
        >
          {done ? "✓" : n}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full px-6 py-4" style={{ backgroundColor: COLORS.pageBg }}>
      <div className="relative flex items-center justify-between w-full px-2">
        {line}
        {[1, 2, 3, 4].map((n) => (
          <StepDot key={n} n={n} />
        ))}
      </div>
    </div>
  );
}

function ShellFont({ children, className = "" }) {
  return (
    <div
      className={`w-full min-h-[100vh] flex flex-col antialiased ${className}`}
      style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        color: COLORS.textPrimary,
        fontSize: 14,
      }}
    >
      {children}
    </div>
  );
}

function SimpleAuxPage({ title, onBack, children }) {
  return (
    <ShellFont>
      <Header variant="page" title={title} showBack onBack={onBack} />
      <div
        className="flex-1 overflow-y-auto w-full px-4 pb-8"
        style={{ backgroundColor: COLORS.pageBg }}
      >
        {children}
      </div>
    </ShellFont>
  );
}

function InfoCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl border p-4 ${className}`}
      style={{
        backgroundColor: COLORS.cardBg,
        borderColor: COLORS.border,
        borderRadius: 12,
      }}
    >
      {children}
    </div>
  );
}

function PrimaryButton({ label, onClick, className = "" }) {
  return (
    <div
      className={`px-4 w-full shrink-0 ${className}`}
      style={{
        paddingBottom: "max(24px, calc(24px + env(safe-area-inset-bottom, 0px)))",
      }}
    >
      <button
        type="button"
        onClick={onClick}
        className="w-full font-semibold text-white"
        style={{
          height: 52,
          borderRadius: 10,
          backgroundColor: COLORS.primaryBlue,
          fontSize: 16,
        }}
      >
        {label}
      </button>
    </div>
  );
}

function HomeScreen({
  onBook,
  tabBarStyle,
  mainTab,
  onTabHome,
  onTabProfile,
  onOpenReminder,
  onOpenAppointments,
  onOpenResults,
  onOpenHistory,
  onOpenSupport,
  onProfileTap,
}) {
  const homeTabActive = mainTab === "home";
  const navy = COLORS.primaryBlue;
  const grey = COLORS.textSecondary;

  return (
    <div
      className="flex flex-col w-full"
      style={{ minHeight: "100vh", backgroundColor: COLORS.pageBg }}
    >
      {homeTabActive ? (
        <Header variant="home" onProfileTap={onProfileTap} />
      ) : (
        <Header variant="page" title="Profil" showBack={false} />
      )}
      <div className="flex-1 w-full pb-24">
        {!homeTabActive ? (
          <ProfileTabContent />
        ) : null}
        {homeTabActive ? (
          <>
            <button
          type="button"
          onClick={onOpenReminder}
          className="mx-4 mt-4 flex gap-3 items-start rounded-xl border overflow-hidden w-[calc(100%-2rem)] text-left cursor-pointer"
          style={{
            backgroundColor: COLORS.warningBg,
            borderColor: "#FBBF24",
            borderLeftWidth: 4,
            borderLeftColor: "#EA580C",
            padding: "14px 12px",
            minHeight: 44,
            fontFamily: "inherit",
          }}
        >
          <span className="text-xl shrink-0" aria-hidden>
            ⚠️
          </span>
          <p
            className="leading-snug flex-1"
            style={{
              fontSize: 14,
              color: "#92400E",
            }}
          >
            Votre visite technique expire dans <strong>23 jours</strong> —
            planifiez dès maintenant.
          </p>
        </button>

        <button
          type="button"
          onClick={onBook}
          className="mx-4 mt-4 w-[calc(100%-2rem)] text-left relative overflow-hidden flex items-center justify-between"
          style={{
            backgroundColor: COLORS.primaryBlue,
            borderRadius: 14,
            padding: "20px 16px",
            minHeight: 44,
          }}
        >
          <div>
            <p className="text-white font-bold" style={{ fontSize: 20 }}>
              Visite technique
            </p>
            <p className="text-white/75 mt-1" style={{ fontSize: 14 }}>
              Prendre un rendez-vous
            </p>
          </div>
          <div
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white shrink-0"
            style={{ color: COLORS.primaryBlue }}
          >
            <span className="text-xl font-semibold leading-none">→</span>
          </div>
        </button>

        <h2
          className="mx-4 mt-6 font-bold"
          style={{ fontSize: 18, color: COLORS.textPrimary }}
        >
          Autres services
        </h2>
        <div className="mx-4 mt-3 grid grid-cols-2 gap-3">
          {[
            { icon: "📅", label: "Mes rendez-vous", onClick: onOpenAppointments },
            { icon: "📚", label: "Résultats", onClick: onOpenResults },
            { icon: "🕐", label: "Historique", onClick: onOpenHistory },
            { icon: "💬", label: "Support", onClick: onOpenSupport },
          ].map(({ icon, label, onClick }) => (
            <button
              key={label}
              type="button"
              onClick={onClick}
              className="flex flex-col items-center justify-center rounded-xl border text-center px-2 py-4 cursor-pointer"
              style={{
                backgroundColor: COLORS.cardBg,
                borderColor: COLORS.border,
                borderRadius: 12,
                minHeight: 100,
                fontFamily: "inherit",
              }}
            >
              <div className="text-2xl mb-2">{icon}</div>
              <span
                className="font-bold leading-tight px-1"
                style={{ fontSize: 14, color: COLORS.textPrimary }}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
          </>
        ) : null}
      </div>

      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex bg-white border-t"
        style={{
          ...tabBarStyle,
          borderTopColor: COLORS.border,
          paddingBottom:
            "max(8px, env(safe-area-inset-bottom, 0px))",
          minHeight:
            "calc(60px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <button
          type="button"
          onClick={onTabHome}
          className="flex-1 flex flex-col items-center justify-center gap-1 pt-2"
          style={{ color: homeTabActive ? navy : grey, minHeight: 44 }}
        >
          <span className="text-xl">🏠</span>
          <span
            className="text-xs font-semibold"
            style={{ fontWeight: homeTabActive ? 600 : 500 }}
          >
            Accueil
          </span>
          {homeTabActive && (
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: navy }} />
          )}
        </button>
        <button
          type="button"
          onClick={onTabProfile}
          className="flex-1 flex flex-col items-center justify-center gap-1 pt-2"
          style={{ color: !homeTabActive ? navy : grey, minHeight: 44 }}
        >
          <span className="text-xl">👤</span>
          <span
            className="text-xs font-medium"
            style={{ fontWeight: !homeTabActive ? 600 : 400 }}
          >
            Profil
          </span>
          {!homeTabActive && (
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: navy }} />
          )}
        </button>
      </nav>
    </div>
  );
}

function ProfileTabContent() {
  return (
    <>
      <div className="px-4 pt-6 pb-4 flex flex-col items-center">
        <div
          className="h-20 w-20 rounded-full flex items-center justify-center mb-3"
          style={{ backgroundColor: "#9CA3AF" }}
        >
          <span className="text-white text-3xl">👤</span>
        </div>
        <p className="font-bold" style={{ fontSize: 17 }}>
          Invité ATTT
        </p>
        <p style={{ fontSize: 14, color: COLORS.textSecondary }}>
          Tunis, Tunisie
        </p>
      </div>
      <div className="px-4 space-y-3">
        <InfoCard>
          <p
            className="uppercase font-semibold mb-3"
            style={{ fontSize: 11, color: COLORS.textSecondary }}
          >
            Coordonnées
          </p>
          {[
            ["Téléphone", "+216 71 222 334"],
            ["E-mail", "contact.exemple@gouv.tn"],
          ].map(([k, v], i) => (
            <div
              key={k}
              className="flex justify-between gap-2 py-3"
              style={{
                borderTop:
                  i > 0 ? `1px solid ${COLORS.border}` : undefined,
              }}
            >
              <span style={{ color: COLORS.textSecondary, fontSize: 14 }}>
                {k}
              </span>
              <span className="font-semibold text-right" style={{ fontSize: 14 }}>
                {v}
              </span>
            </div>
          ))}
        </InfoCard>
        <InfoCard>
          <p
            className="uppercase font-semibold mb-1"
            style={{ fontSize: 11, color: COLORS.textSecondary }}
          >
            À propos
          </p>
          <p style={{ fontSize: 14, color: COLORS.textSecondary, lineHeight: 1.5 }}>
            Compte fictif démo. Les données sont statiques dans cette maquette front-end.
          </p>
        </InfoCard>
      </div>
    </>
  );
}

function OutlineRowButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full font-semibold mt-2"
      style={{
        height: 44,
        borderRadius: 10,
        border: `1.5px solid ${COLORS.primaryBlue}`,
        backgroundColor: COLORS.cardBg,
        color: COLORS.primaryBlue,
        fontSize: 15,
      }}
    >
      {label}
    </button>
  );
}

function ScreenVisitReminder({ onBack }) {
  return (
    <SimpleAuxPage title="Rappel visite" onBack={onBack}>
      <div className="pt-4 space-y-3">
        <InfoCard>
          <p className="font-bold mb-2" style={{ fontSize: 16 }}>
            Échéance proche
          </p>
          <p style={{ fontSize: 14, color: COLORS.textSecondary, lineHeight: 1.5 }}>
            Votre visite technique doit être renouvelée dans <strong>23 jours</strong>.
            Réservez depuis l’accueil, rubrique « Visite technique ».
          </p>
        </InfoCard>
      </div>
    </SimpleAuxPage>
  );
}

function ScreenAppointments({ onBack }) {
  return (
    <SimpleAuxPage title="Mes rendez-vous" onBack={onBack}>
      <div className="pt-4 space-y-3">
        <InfoCard>
          <div className="flex justify-between items-start gap-2 mb-1">
            <span className="font-bold" style={{ fontSize: 15 }}>
              RDV-2026-08471
            </span>
            <span
              className="rounded-full px-2 py-0.5 shrink-0"
              style={{
                backgroundColor: "#DCFCE7",
                fontSize: 12,
                color: "#166534",
                fontWeight: 600,
              }}
            >
              Confirmé
            </span>
          </div>
          <p style={{ fontSize: 13, color: COLORS.textSecondary }}>
            Centre Sijoumi, Tunis · Mer. 13 mai 2026 · 09:30
          </p>
          <OutlineRowButton
            label="Voir le détail (démo)"
            onClick={() =>
              window.alert("Détail du rendez-vous (données fictives).")
            }
          />
        </InfoCard>
      </div>
    </SimpleAuxPage>
  );
}

function ScreenResults({ onBack }) {
  return (
    <SimpleAuxPage title="Résultats" onBack={onBack}>
      <div className="pt-4 space-y-3">
        <InfoCard>
          <p
            className="uppercase font-semibold mb-2"
            style={{ fontSize: 11, color: COLORS.textSecondary }}
          >
            Dernière visite
          </p>
          <p className="font-bold" style={{ fontSize: 16 }}>
            Visite favorable
          </p>
          <p style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 6 }}>
            123 TU 4567 · Mars 2026 · Centre Sijoumi
          </p>
          <OutlineRowButton
            label="Télécharger le procès-verbal (démo)"
            onClick={() =>
              window.alert("Téléchargement simulé (aucun fichier).")
            }
          />
        </InfoCard>
      </div>
    </SimpleAuxPage>
  );
}

function ScreenHistory({ onBack }) {
  const rows = [
    ["Déc. 2024", "Sijoumi", "Favorable"],
    ["Déc. 2023", "Ben Arous", "Favorable"],
  ];
  return (
    <SimpleAuxPage title="Historique" onBack={onBack}>
      <div className="pt-4 space-y-3">
        <div
          className="rounded-xl border overflow-hidden"
          style={{
            backgroundColor: COLORS.cardBg,
            borderColor: COLORS.border,
            borderRadius: 12,
          }}
        >
          {rows.map(([date, place, res], i) => (
            <div
              key={date}
              className="flex justify-between items-center gap-2 px-4 py-3"
              style={{
                borderBottom:
                  i < rows.length - 1
                    ? `1px solid ${COLORS.border}`
                    : undefined,
                minHeight: 48,
              }}
            >
              <div>
                <p className="font-bold" style={{ fontSize: 14 }}>
                  {date}
                </p>
                <p style={{ fontSize: 12, color: COLORS.textSecondary }}>
                  {place}
                </p>
              </div>
              <span className="font-semibold" style={{ fontSize: 13 }}>
                {res}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SimpleAuxPage>
  );
}

function ScreenSupport({ onBack }) {
  const [topic, setTopic] = useState(null);
  const copy = {
    horaires:
      "Les centres sont ouverts du lundi au samedi (heures indicatives : 8h–16h). Démo statique.",
    vert:
      "Numéro d’information fictif : +216 71 000 000. Aucun appel réel depuis cette maquette.",
    faq: "Questions fréquentes : délais, documents, renouvellement. Contenu de démonstration sans API.",
  };
  return (
    <SimpleAuxPage title="Support" onBack={onBack}>
      <div className="pt-4 space-y-3">
        <button
          type="button"
          className="w-full text-left rounded-xl border p-4 cursor-pointer"
          style={{
            borderColor: COLORS.border,
            backgroundColor: COLORS.cardBg,
            borderRadius: 12,
          }}
          onClick={() => setTopic((t) => (t === "horaires" ? null : "horaires"))}
        >
          <span className="font-bold" style={{ fontSize: 15 }}>
            Horaires des centres
          </span>
          {topic === "horaires" && (
            <p className="mt-2" style={{ fontSize: 14, color: COLORS.textSecondary }}>
              {copy.horaires}
            </p>
          )}
        </button>
        <button
          type="button"
          className="w-full text-left rounded-xl border p-4 cursor-pointer"
          style={{
            borderColor: COLORS.border,
            backgroundColor: COLORS.cardBg,
            borderRadius: 12,
          }}
          onClick={() => setTopic((t) => (t === "vert" ? null : "vert"))}
        >
          <span className="font-bold" style={{ fontSize: 15 }}>
            Numéro d’information
          </span>
          {topic === "vert" && (
            <p className="mt-2" style={{ fontSize: 14, color: COLORS.textSecondary }}>
              {copy.vert}
            </p>
          )}
        </button>
        <button
          type="button"
          className="w-full text-left rounded-xl border p-4 cursor-pointer"
          style={{
            borderColor: COLORS.border,
            backgroundColor: COLORS.cardBg,
            borderRadius: 12,
          }}
          onClick={() => setTopic((t) => (t === "faq" ? null : "faq"))}
        >
          <span className="font-bold" style={{ fontSize: 15 }}>
            FAQ rapide
          </span>
          {topic === "faq" && (
            <p className="mt-2" style={{ fontSize: 14, color: COLORS.textSecondary }}>
              {copy.faq}
            </p>
          )}
        </button>
      </div>
    </SimpleAuxPage>
  );
}

function PillRow({ options, selected, onSelect }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((opt) => {
        const isSel = selected === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            className="px-4 rounded-full border font-semibold"
            style={{
              minHeight: 44,
              fontSize: 14,
              backgroundColor: isSel ? COLORS.primaryBlue : COLORS.cardBg,
              color: isSel ? "#FFFFFF" : COLORS.textPrimary,
              borderColor: isSel ? COLORS.primaryBlue : COLORS.border,
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function Step1Vehicle({
  onContinue,
  plate,
  setPlate,
  plateType,
  setPlateType,
  category,
  setCategory,
}) {
  const cats = [
    { key: "Voiture particulière", emoji: "🚗" },
    { key: "Véhicule utilitaire", emoji: "🚙" },
    { key: "Taxi / Louage", emoji: "🚕" },
    { key: "Moto / Tricycle", emoji: "🏍️" },
  ];

  return (
    <div
      className="flex flex-col w-full flex-1 min-h-0"
      style={{ backgroundColor: COLORS.pageBg }}
    >
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        <section
          className="rounded-xl border p-4 mt-4"
          style={{
            backgroundColor: COLORS.cardBg,
            borderColor: COLORS.border,
            borderRadius: 12,
          }}
        >
          <p
            className="mb-3 tracking-wide uppercase"
            style={{
              fontSize: 11,
              color: COLORS.textSecondary,
              fontWeight: 600,
            }}
          >
            TYPE DE PLAQUE
          </p>
          <PillRow
            options={["Tunisienne", "Diplomatique", "Transit"]}
            selected={plateType}
            onSelect={setPlateType}
          />
        </section>

        <section
          className="rounded-xl border p-4"
          style={{
            backgroundColor: COLORS.cardBg,
            borderColor: COLORS.border,
            borderRadius: 12,
          }}
        >
          <p
            className="mb-3 tracking-wide uppercase"
            style={{
              fontSize: 11,
              color: COLORS.textSecondary,
              fontWeight: 600,
            }}
          >
            CATÉGORIE DE VÉHICULE
          </p>
          <div className="grid grid-cols-2 gap-3">
            {cats.map(({ key, emoji }) => {
              const isSel = category === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCategory(key)}
                  className="rounded-xl flex flex-col items-center justify-center py-4 px-2"
                  style={{
                    minHeight: 88,
                    borderRadius: 12,
                    border: isSel
                      ? `2px solid ${COLORS.primaryBlue}`
                      : `1px solid ${COLORS.border}`,
                    backgroundColor: isSel ? "#F8FAFC" : COLORS.cardBg,
                  }}
                >
                  <span className="text-3xl mb-2">{emoji}</span>
                  <span
                    className="text-center font-semibold leading-tight"
                    style={{
                      fontSize: 13,
                      color: isSel ? COLORS.primaryBlue : COLORS.textPrimary,
                    }}
                  >
                    {key}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section
          className="rounded-xl border p-4"
          style={{
            backgroundColor: COLORS.cardBg,
            borderColor: COLORS.border,
            borderRadius: 12,
          }}
        >
          <p
            className="mb-3 tracking-wide uppercase"
            style={{
              fontSize: 11,
              color: COLORS.textSecondary,
              fontWeight: 600,
            }}
          >
            NUMÉRO D&apos;IMMATRICULATION
          </p>
          <input
            type="text"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            className="w-full border px-3 text-center font-mono outline-none"
            style={{
              borderRadius: 8,
              borderColor: COLORS.border,
              backgroundColor: "#FAF9F6",
              fontSize: 18,
              minHeight: 48,
              color: COLORS.textPrimary,
            }}
          />
        </section>
      </div>
      <PrimaryButton label="Continuer →" onClick={onContinue} />
    </div>
  );
}

const CENTERS = [
  {
    id: "1",
    name: "Centre Sijoumi",
    line: "Route de Sijoumi, Tunis · 3.2 km",
    badge: "green",
    badgeText: "Disponible aujourd'hui",
  },
  {
    id: "2",
    name: "Centre Ben Arous",
    line: "Av. Habib Bourguiba, Ben Arous · 8.5 km",
    badge: "orange",
    badgeText: "Prochain dispo: demain",
  },
  {
    id: "3",
    name: "Centre Ariana",
    line: "Cité El Ghazala, Ariana · 11 km",
    badge: "green",
    badgeText: "Disponible aujourd'hui",
  },
];

function Step2Center({ centerId, setCenterId, onContinue }) {
  const [govOpen, setGovOpen] = useState(false);
  const [gov, setGov] = useState("Tunis");
  const govs = ["Tunis", "Ben Arous", "Ariana", "Bizerte"];

  return (
    <div
      className="flex flex-col w-full flex-1 min-h-0"
      style={{ backgroundColor: COLORS.pageBg }}
    >
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        <div
          className="rounded-xl border p-3 mt-4 flex flex-col gap-2"
          style={{
            backgroundColor: COLORS.cardBg,
            borderColor: COLORS.border,
            borderRadius: 12,
          }}
        >
          <div className="flex gap-2 items-stretch">
            <button
              type="button"
              className="flex-1 flex items-center justify-between px-3 border rounded-full text-left cursor-pointer"
              style={{
                borderColor: COLORS.border,
                backgroundColor: "#F3F4F6",
                minHeight: 44,
                fontSize: 14,
                color: COLORS.textSecondary,
              }}
              onClick={() => setGovOpen((o) => !o)}
            >
              <span>{gov}</span>
              <span className="text-xs">▾</span>
            </button>
            <button
              type="button"
              className="border flex items-center justify-center shrink-0 cursor-pointer"
              style={{
                width: 44,
                height: 44,
                borderRadius: 8,
                borderColor: COLORS.border,
                backgroundColor: COLORS.cardBg,
              }}
              onClick={() => setGovOpen(false)}
              aria-label="Rechercher"
            >
              <span style={{ fontSize: 18 }}>🔍</span>
            </button>
          </div>
          {govOpen && (
            <div className="flex flex-wrap gap-2 pt-1">
              {govs.map((g) => (
                <button
                  key={g}
                  type="button"
                  className="px-3 py-2 rounded-full border text-sm cursor-pointer"
                  style={{
                    borderColor:
                      gov === g ? COLORS.primaryBlue : COLORS.border,
                    backgroundColor:
                      gov === g ? "#EFF6FF" : COLORS.cardBg,
                    fontWeight: gov === g ? 600 : 400,
                  }}
                  onClick={() => {
                    setGov(g);
                    setGovOpen(false);
                  }}
                >
                  {g}
                </button>
              ))}
            </div>
          )}
        </div>
        <p style={{ fontSize: 14, color: COLORS.textSecondary }}>
          {`3 centres disponibles — ${gov}`}
        </p>
        <div className="flex flex-col gap-3">
          {CENTERS.map((c) => {
            const sel = centerId === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCenterId(c.id)}
                className="rounded-xl border text-left p-3 flex gap-3"
                style={{
                  borderRadius: 12,
                  borderWidth: sel ? 2 : 1,
                  borderColor: sel ? COLORS.primaryBlue : COLORS.border,
                  backgroundColor: COLORS.cardBg,
                  minHeight: 44,
                }}
              >
                <div className="pt-1 shrink-0">
                  <div
                    className="rounded-full flex items-center justify-center"
                    style={{
                      width: 22,
                      height: 22,
                      border: sel
                        ? "none"
                        : `2px solid ${COLORS.textSecondary}`,
                      backgroundColor: sel ? COLORS.primaryBlue : "transparent",
                    }}
                  >
                    {sel && (
                      <span
                        className="block rounded-full bg-white"
                        style={{ width: 8, height: 8 }}
                      />
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold" style={{ fontSize: 16 }}>
                    {c.name}
                  </p>
                  <p style={{ fontSize: 13, color: COLORS.textSecondary }}>
                    {c.line}
                  </p>
                  <div className="mt-2 inline-block rounded-full px-2 py-0.5"
                    style={
                      c.badge === "green"
                        ? {
                            backgroundColor: "#DCFCE7",
                            fontSize: 12,
                            color: "#166534",
                            fontWeight: 600,
                          }
                        : {
                            backgroundColor: "#FFEDD5",
                            fontSize: 12,
                            color: "#C2410C",
                            fontWeight: 600,
                          }
                    }
                  >
                    {c.badgeText}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <PrimaryButton label="Continuer →" onClick={onContinue} />
    </div>
  );
}

const MAY_2026 = {
  offset: 4,
  daysInMonth: 31,
};
const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];
const DISABLED_FULL = new Set([10, 11, 17, 18]);
const SLOTS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
];

function getSlotVisual(s, selected) {
  const fullOutline = {
    backgroundColor: "transparent",
    color: "#9CA3AF",
    border: `1px solid ${COLORS.border}`,
  };
  const greyDisabled = {
    backgroundColor: "#F3F4F6",
    color: COLORS.textSecondary,
    border: `1px solid ${COLORS.border}`,
  };
  const available = {
    backgroundColor: COLORS.cardBg,
    color: COLORS.textPrimary,
    border: `1px solid ${COLORS.border}`,
  };
  const selectedSlot = {
    backgroundColor: COLORS.primaryBlue,
    color: "#FFFFFF",
    border: "none",
  };

  if (s === selected) return selectedSlot;

  if (s === "09:00" || s === "10:30") return greyDisabled;

  if (["08:00", "08:30", "14:00"].includes(s)) return fullOutline;

  return available;
}

function slotIsSelectable(s) {
  if (s === "09:00" || s === "10:30") return false;
  if (["08:00", "08:30", "14:00"].includes(s)) return false;
  return true;
}

function Step3Calendar({
  onContinue,
  selectedDay,
  setSelectedDay,
  slot,
  setSlot,
}) {
  const monthCycle = ["Avril 2026", "Mai 2026", "Juin 2026"];
  const [monthIdx, setMonthIdx] = useState(1);

  const cells = [];
  for (let i = 0; i < MAY_2026.offset; i++) cells.push(null);
  for (let d = 1; d <= MAY_2026.daysInMonth; d++) cells.push(d);

  const dayBtn = (d, padIdx) => {
    if (!d) return <div key={`pad-${padIdx}`} />;
    const isToday = d === 8;
    const isSel = d === selectedDay;
    const isFull = DISABLED_FULL.has(d);
    return (
      <button
        key={`d-${d}`}
        type="button"
        disabled={isFull}
        onClick={() => !isFull && setSelectedDay(d)}
        className="flex items-center justify-center mx-auto"
        style={{
          width: 36,
          height: 36,
          fontSize: 14,
          textDecoration: isFull ? "line-through" : "none",
          borderRadius: isSel || isToday ? 9999 : 4,
          backgroundColor: isSel ? COLORS.primaryBlue : "transparent",
          color: isSel ? "#FFFFFF" : isFull ? "#9CA3AF" : COLORS.textPrimary,
          border: isToday && !isSel ? `2px solid ${COLORS.accentOrange}` : "none",
        }}
      >
        {d}
      </button>
    );
  };

  return (
    <div
      className="flex flex-col w-full flex-1 min-h-0"
      style={{ backgroundColor: COLORS.pageBg }}
    >
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        <div
          className="rounded-xl border p-4 mt-4"
          style={{
            backgroundColor: COLORS.cardBg,
            borderColor: COLORS.border,
            borderRadius: 12,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              className="p-2 min-w-[44px] text-lg cursor-pointer"
              onClick={() => setMonthIdx((i) => Math.max(0, i - 1))}
              aria-label="Mois précédent"
            >
              ‹
            </button>
            <span className="font-bold" style={{ fontSize: 16 }}>
              {monthCycle[monthIdx]}
            </span>
            <button
              type="button"
              className="p-2 min-w-[44px] text-lg cursor-pointer"
              onClick={() =>
                setMonthIdx((i) => Math.min(monthCycle.length - 1, i + 1))
              }
              aria-label="Mois suivant"
            >
              ›
            </button>
          </div>
          <div className="grid grid-cols-7 gap-y-2 text-center mb-2">
            {WEEKDAYS.map((w, i) => (
              <span
                key={`${w}-${i}`}
                style={{ fontSize: 12, color: COLORS.textSecondary }}
              >
                {w}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-2">
            {cells.map((d, padIdx) => dayBtn(d, padIdx))}
          </div>
          <div className="flex gap-4 mt-3 pt-2 items-center flex-wrap">
            <span style={{ fontSize: 12, color: COLORS.textSecondary }}>
              ● Disponible
            </span>
            <span
              style={{
                fontSize: 12,
                color: COLORS.textSecondary,
                textDecoration: "line-through",
              }}
            >
              Complet
            </span>
          </div>
        </div>

        <div
          className="rounded-xl border p-4"
          style={{
            backgroundColor: COLORS.cardBg,
            borderColor: COLORS.border,
            borderRadius: 12,
          }}
        >
          <p
            className="mb-3 tracking-wide uppercase font-semibold"
            style={{
              fontSize: 11,
              color: COLORS.textSecondary,
            }}
          >
            CRÉNEAUX DISPONIBLES — {selectedDay} MAI
          </p>
          <div className="grid grid-cols-3 gap-2">
            {SLOTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => slotIsSelectable(s) && setSlot(s)}
                className="font-medium"
                aria-disabled={!slotIsSelectable(s)}
                style={{
                  height: 44,
                  borderRadius: 8,
                  fontSize: 14,
                  ...getSlotVisual(s, slot),
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
      <PrimaryButton label="Continuer →" onClick={onContinue} />
    </div>
  );
}

function SummaryCard({ title, rows }) {
  return (
    <section
      className="rounded-xl border overflow-hidden"
      style={{
        backgroundColor: COLORS.cardBg,
        borderColor: COLORS.border,
        borderRadius: 12,
      }}
    >
      <p
        className="px-4 pt-4 pb-2 tracking-wide uppercase font-semibold"
        style={{ fontSize: 11, color: COLORS.textSecondary }}
      >
        {title}
      </p>
      <div>
        {rows.map(([label, val, valStyle, labelBold], idx) => (
          <div
            key={idx}
            className="flex items-center justify-between gap-2 px-4 py-3"
            style={{
              minHeight: 44,
              borderBottom:
                idx < rows.length - 1
                  ? `1px solid ${COLORS.border}`
                  : undefined,
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: labelBold ? 700 : 400,
                color: labelBold ? COLORS.textPrimary : COLORS.textSecondary,
              }}
            >
              {label}
            </span>
            <span
              className="font-bold text-right shrink-0"
              style={{
                fontSize: 14,
                color: valStyle?.color || COLORS.textPrimary,
              }}
            >
              {val}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Step4Summary({
  plate,
  category,
  centerLine,
  dateLine,
  timeLine,
  onConfirm,
}) {
  return (
    <div
      className="flex flex-col w-full flex-1 min-h-0"
      style={{ backgroundColor: COLORS.pageBg }}
    >
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        <div className="space-y-3 mt-4">
          <SummaryCard
            title="VÉHICULE"
            rows={[
              ["Immatriculation", plate],
              ["Catégorie", category],
              ["Type de visite", "Périodique"],
            ]}
          />
          <SummaryCard
            title="RENDEZ-VOUS"
            rows={[
              ["Centre", centerLine],
              ["Date", dateLine],
              ["Heure", timeLine],
            ]}
          />
          <SummaryCard
            title="PAIEMENT"
            rows={[
              ["Tarif visite", "31,500 DT"],
              ["Redevance", "5,000 DT"],
              ["Total", "36,500 DT", { color: COLORS.refBlue }, true],
            ]}
          />
        </div>
        <div
          className="rounded-lg border px-3 py-3 flex gap-2 items-start"
          style={{
            borderColor: "#FBBF24",
            backgroundColor: COLORS.warningBg,
            borderLeftWidth: 4,
            borderLeftColor: "#EA580C",
          }}
        >
          <span className="text-base">📄</span>
          <p style={{ fontSize: 13, color: COLORS.textSecondary }}>
            Présenter le reçu au centre le jour du rendez-vous.
          </p>
        </div>
      </div>
      <PrimaryButton label="Confirmer →" onClick={onConfirm} />
    </div>
  );
}

function ConfirmationScreen({
  plate,
  centerLine,
  dateLine,
  timeLine,
  onHome,
}) {
  const [hint, setHint] = useState("");
  const hintRef = useRef(null);

  const flashHint = (msg) => {
    if (hintRef.current) window.clearTimeout(hintRef.current);
    setHint(msg);
    hintRef.current = window.setTimeout(() => setHint(""), 2200);
  };

  return (
    <div
      className="flex flex-col w-full flex-1"
      style={{
        backgroundColor: COLORS.pageBg,
        padding: "32px 20px",
        paddingBottom:
          "max(32px, calc(32px + env(safe-area-inset-bottom, 0px)))",
      }}
    >
      <div className="flex flex-col items-center text-center">
        <div
          className="rounded-full flex items-center justify-center mb-5"
          style={{
            width: 64,
            height: 64,
            backgroundColor: "#DCFCE7",
          }}
        >
          <span style={{ fontSize: 28, color: COLORS.successGreen }}>✓</span>
        </div>
        <h2
          className="font-bold mb-2"
          style={{ fontSize: 22, color: COLORS.textPrimary }}
        >
          Rendez-vous confirmé !
        </h2>
        <p
          className="mb-6 max-w-xs"
          style={{ fontSize: 14, color: COLORS.textSecondary }}
        >
          Un SMS de confirmation a été envoyé au numéro enregistré.
        </p>

        <div
          className="w-full max-w-md mb-6 text-center"
          style={{
            border: "1.5px dashed #CBD5E1",
            borderRadius: 12,
            padding: 16,
          }}
        >
          <p
            className="uppercase mb-2 font-semibold"
            style={{
              fontSize: 11,
              color: COLORS.textSecondary,
            }}
          >
            NUMÉRO DE RÉFÉRENCE
          </p>
          <p
            className="font-bold tracking-tight"
            style={{
              fontSize: 28,
              color: COLORS.refBlue,
            }}
          >
            RDV-2026-08471
          </p>
        </div>

        <div
          className="w-full max-w-md rounded-xl border mb-6 overflow-hidden"
          style={{
            backgroundColor: COLORS.cardBg,
            borderColor: COLORS.border,
            borderRadius: 12,
          }}
        >
          {[
            ["Centre", centerLine],
            ["Date", dateLine],
            ["Heure", timeLine],
            ["Plaque", plate],
          ].map(([k, v], i, arr) => (
            <div
              key={k}
              className="flex items-center justify-between px-4 py-3 gap-4"
              style={{
                borderBottom:
                  i < arr.length - 1 ? `1px solid ${COLORS.border}` : "none",
                minHeight: 44,
              }}
            >
              <span style={{ fontSize: 14, color: COLORS.textSecondary }}>
                {k}
              </span>
              <span
                className="font-bold text-right"
                style={{ fontSize: 14, color: COLORS.textPrimary }}
              >
                {v}
              </span>
            </div>
          ))}
        </div>

        <div className="w-full space-y-3">
          <button
            type="button"
            className="w-full font-semibold cursor-pointer"
            style={{
              height: 52,
              borderRadius: 10,
              border: `1.5px solid ${COLORS.primaryBlue}`,
              backgroundColor: COLORS.cardBg,
              color: COLORS.primaryBlue,
              fontSize: 16,
            }}
            onClick={() => flashHint("Téléchargement simulé (démo).")}
          >
            Télécharger le reçu
          </button>
          <button
            type="button"
            className="w-full font-semibold cursor-pointer"
            style={{
              height: 52,
              borderRadius: 10,
              border: `1.5px solid ${COLORS.primaryBlue}`,
              backgroundColor: COLORS.cardBg,
              color: COLORS.primaryBlue,
              fontSize: 16,
            }}
            onClick={() =>
              flashHint("Ajout au calendrier simulé (aucune donnée envoyée).")
            }
          >
            Ajouter au calendrier
          </button>
        </div>
        {hint ? (
          <p
            className="w-full text-center mt-2"
            style={{ fontSize: 13, color: COLORS.textSecondary }}
          >
            {hint}
          </p>
        ) : null}

        <button
          type="button"
          onClick={onHome}
          className="mt-8 underline font-medium"
          style={{ fontSize: 14, color: COLORS.refBlue, minHeight: 44 }}
        >
          Retour à l&apos;accueil
        </button>
      </div>
    </div>
  );
}

function ScreenShell({ title, step, children, showBack, onBack }) {
  return (
    <div
      className="flex flex-col w-full"
      style={{ minHeight: "100vh", backgroundColor: COLORS.pageBg }}
    >
      <Header variant="steps" title={title} showBack={showBack} onBack={onBack} />
      <StepBar current={step} />
      {children}
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState("home");
  const [mainTab, setMainTab] = useState("home");
  const [plate, setPlate] = useState("123 TU 4567");
  const [plateType, setPlateType] = useState("Tunisienne");
  const [category, setCategory] = useState("Voiture particulière");
  const [centerId, setCenterId] = useState("1");
  const [visitDay, setVisitDay] = useState(13);
  const [visitSlot, setVisitSlot] = useState("09:30");

  const centerLine = centerSummaryLine(CENTERS, centerId);
  const dateLine = formatVisitDateMay2026(visitDay);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [screen]);

  const goBack = () => {
    const map = {
      step1: "home",
      step2: "step1",
      step3: "step2",
      step4: "step3",
      visitReminder: "home",
      appointments: "home",
      results: "home",
      history: "home",
      support: "home",
    };
    if (map[screen]) setScreen(map[screen]);
  };

  const tabBarStyle = {};

  if (
    screen === "visitReminder" ||
    screen === "appointments" ||
    screen === "results" ||
    screen === "history" ||
    screen === "support"
  ) {
    return (
      <ShellFont>
        {screen === "visitReminder" && <ScreenVisitReminder onBack={goBack} />}
        {screen === "appointments" && <ScreenAppointments onBack={goBack} />}
        {screen === "results" && <ScreenResults onBack={goBack} />}
        {screen === "history" && <ScreenHistory onBack={goBack} />}
        {screen === "support" && <ScreenSupport onBack={goBack} />}
      </ShellFont>
    );
  }

  if (screen === "home") {
    return (
      <ShellFont>
        <HomeScreen
          tabBarStyle={tabBarStyle}
          mainTab={mainTab}
          onTabHome={() => setMainTab("home")}
          onTabProfile={() => setMainTab("profile")}
          onProfileTap={() => setMainTab("profile")}
          onBook={() => setScreen("step1")}
          onOpenReminder={() => setScreen("visitReminder")}
          onOpenAppointments={() => setScreen("appointments")}
          onOpenResults={() => setScreen("results")}
          onOpenHistory={() => setScreen("history")}
          onOpenSupport={() => setScreen("support")}
        />
      </ShellFont>
    );
  }

  if (screen === "confirmation") {
    return (
      <ShellFont>
        <Header variant="confirmation" title="Confirmation" />
        <ConfirmationScreen
          plate={plate}
          centerLine={centerLine}
          dateLine={dateLine}
          timeLine={visitSlot}
          onHome={() => {
            setScreen("home");
            setMainTab("home");
          }}
        />
      </ShellFont>
    );
  }

  const titles = {
    step1: "Visite technique",
    step2: "Choisir un centre",
    step3: "Date & heure",
    step4: "Récapitulatif",
  };
  const steps = { step1: 1, step2: 2, step3: 3, step4: 4 };

  return (
    <ShellFont>
      <ScreenShell
        title={titles[screen]}
        step={steps[screen]}
        showBack
        onBack={goBack}
      >
        {screen === "step1" && (
          <Step1Vehicle
            plate={plate}
            setPlate={setPlate}
            plateType={plateType}
            setPlateType={setPlateType}
            category={category}
            setCategory={setCategory}
            onContinue={() => setScreen("step2")}
          />
        )}
        {screen === "step2" && (
          <Step2Center
            centerId={centerId}
            setCenterId={setCenterId}
            onContinue={() => setScreen("step3")}
          />
        )}
        {screen === "step3" && (
          <Step3Calendar
            selectedDay={visitDay}
            setSelectedDay={setVisitDay}
            slot={visitSlot}
            setSlot={setVisitSlot}
            onContinue={() => setScreen("step4")}
          />
        )}
        {screen === "step4" && (
          <Step4Summary
            plate={plate}
            category={category}
            centerLine={centerLine}
            dateLine={dateLine}
            timeLine={visitSlot}
            onConfirm={() => setScreen("confirmation")}
          />
        )}
      </ScreenShell>
    </ShellFont>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
