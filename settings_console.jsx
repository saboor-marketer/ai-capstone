import React, { useState } from "react";
import { User, Bell, Palette, Shield, Check, X } from "lucide-react";

const TABS = [
  { id: "profile", label: "PROFILE", ch: "01", icon: User },
  { id: "notifications", label: "NOTIFY", ch: "02", icon: Bell },
  { id: "appearance", label: "DISPLAY", ch: "03", icon: Palette },
  { id: "security", label: "SECURE", ch: "04", icon: Shield },
];

const ACCENTS = [
  { id: "amber", hex: "#E8C468" },
  { id: "sage", hex: "#8FA07E" },
  { id: "rust", hex: "#B4694A" },
  { id: "steel", hex: "#7C93A8" },
];

function Rocker({ checked, onChange, label }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between w-full py-3 px-4 rounded-sm"
      style={{
        background: "#1C1E1B",
        border: "1px solid #3A3C37",
      }}
    >
      <span
        className="text-xs tracking-widest"
        style={{ color: "#B8B6A8", fontFamily: "'JetBrains Mono', monospace" }}
      >
        {label}
      </span>
      <span
        className="relative inline-block"
        style={{ width: "44px", height: "22px" }}
      >
        <span
          className="absolute inset-0 rounded-sm transition-colors duration-150"
          style={{
            background: checked ? "#4A4020" : "#131412",
            border: `1px solid ${checked ? "#E8C468" : "#3A3C37"}`,
          }}
        />
        <span
          className="absolute rounded-sm transition-all duration-150"
          style={{
            top: "2px",
            bottom: "2px",
            width: "18px",
            left: checked ? "23px" : "2px",
            background: checked ? "#E8C468" : "#6B6A5E",
            boxShadow: checked ? "0 0 6px rgba(232,196,104,0.7)" : "none",
          }}
        />
      </span>
    </button>
  );
}

function Fader({ label, value, onChange, min = 0, max = 100 }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div
      className="py-3 px-4 rounded-sm"
      style={{ background: "#1C1E1B", border: "1px solid #3A3C37" }}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-xs tracking-widest"
          style={{ color: "#B8B6A8", fontFamily: "'JetBrains Mono', monospace" }}
        >
          {label}
        </span>
        <span
          className="text-xs"
          style={{ color: "#E8C468", fontFamily: "'JetBrains Mono', monospace" }}
        >
          {value}
        </span>
      </div>
      <div className="relative" style={{ height: "18px" }}>
        <div
          className="absolute rounded-sm"
          style={{
            top: "8px",
            left: 0,
            right: 0,
            height: "2px",
            background: "#3A3C37",
          }}
        />
        <div
          className="absolute rounded-sm"
          style={{
            top: "8px",
            left: 0,
            width: `${pct}%`,
            height: "2px",
            background: "#E8C468",
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
          style={{ height: "18px" }}
        />
        <div
          className="absolute rounded-sm pointer-events-none"
          style={{
            top: "2px",
            width: "6px",
            height: "14px",
            left: `calc(${pct}% - 3px)`,
            background: "#EDE9DE",
            border: "1px solid #8B8A7E",
          }}
        />
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }) {
  return (
    <label className="block">
      <span
        className="block text-xs tracking-widest mb-1.5"
        style={{ color: "#8B8A7E", fontFamily: "'JetBrains Mono', monospace" }}
      >
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-sm outline-none"
        style={{
          background: "#131412",
          border: "1px solid #3A3C37",
          color: "#EDE9DE",
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#E8C468")}
        onBlur={(e) => (e.target.style.borderColor = "#3A3C37")}
      />
    </label>
  );
}

function SectionHeader({ ch, title, sub }) {
  return (
    <div className="flex items-baseline gap-3 mb-6">
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: "#E8C468",
          fontSize: "12px",
          letterSpacing: "0.15em",
        }}
      >
        CH.{ch}
      </span>
      <h2
        style={{
          fontFamily: "'Oswald', sans-serif",
          color: "#EDE9DE",
          fontSize: "22px",
          letterSpacing: "0.03em",
          textTransform: "uppercase",
        }}
      >
        {title}
      </h2>
      {sub && (
        <span
          className="text-xs ml-1"
          style={{ color: "#6B6A5E", fontFamily: "'Inter', sans-serif" }}
        >
          {sub}
        </span>
      )}
    </div>
  );
}

export default function SettingsConsole() {
  const [active, setActive] = useState("profile");
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: "Adrian Voss",
    email: "adrian@fieldnote.app",
    bio: "Writes about analog synths and long walks.",
  });

  const [notify, setNotify] = useState({
    digest: true,
    push: false,
    mentions: true,
    marketing: false,
    frequency: 40,
  });

  const [appearance, setAppearance] = useState({
    theme: "dark",
    fontSize: 62,
    accent: "amber",
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
  });

  const markDirty = () => {
    setDirty(true);
    setSaved(false);
  };

  const handleSave = () => {
    setDirty(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  const handleReset = () => setDirty(false);

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center p-6"
      style={{ background: "#131412" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
      `}</style>
      <div
        className="w-full rounded-md overflow-hidden"
        style={{
          maxWidth: "920px",
          background: "#1C1E1B",
          border: "1px solid #34362F",
          boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid #34362F", background: "#181A17" }}
        >
          <div className="flex items-center gap-3">
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "1px",
                background: dirty ? "#E8C468" : "#4A6B4E",
                boxShadow: dirty
                  ? "0 0 8px rgba(232,196,104,0.8)"
                  : "0 0 8px rgba(74,107,78,0.6)",
              }}
            />
            <h1
              style={{
                fontFamily: "'Oswald', sans-serif",
                color: "#EDE9DE",
                fontSize: "18px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Session Settings
            </h1>
          </div>
          <span
            className="text-xs"
            style={{ color: "#6B6A5E", fontFamily: "'JetBrains Mono', monospace" }}
          >
            {dirty ? "UNSAVED" : saved ? "SAVED" : "IDLE"}
          </span>
        </div>

        <div className="flex" style={{ minHeight: "460px" }}>
          {/* Sidebar */}
          <div
            style={{
              width: "180px",
              borderRight: "1px solid #34362F",
              background: "#181A17",
            }}
          >
            {TABS.map((t) => {
              const Icon = t.icon;
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className="w-full flex items-center gap-2.5 px-5 py-4 text-left"
                  style={{
                    borderLeft: isActive
                      ? "2px solid #E8C468"
                      : "2px solid transparent",
                    background: isActive ? "#232620" : "transparent",
                  }}
                >
                  <Icon
                    size={14}
                    color={isActive ? "#E8C468" : "#6B6A5E"}
                    strokeWidth={2}
                  />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      color: isActive ? "#EDE9DE" : "#6B6A5E",
                    }}
                  >
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Main panel */}
          <div className="flex-1 px-8 py-7">
            {active === "profile" && (
              <div>
                <SectionHeader ch="01" title="Profile" sub="public identity" />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Field
                    label="NAME"
                    value={profile.name}
                    onChange={(v) => {
                      setProfile({ ...profile, name: v });
                      markDirty();
                    }}
                  />
                  <Field
                    label="EMAIL"
                    type="email"
                    value={profile.email}
                    onChange={(v) => {
                      setProfile({ ...profile, email: v });
                      markDirty();
                    }}
                  />
                </div>
                <label className="block">
                  <span
                    className="block text-xs tracking-widest mb-1.5"
                    style={{ color: "#8B8A7E", fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    BIO
                  </span>
                  <textarea
                    rows={3}
                    value={profile.bio}
                    onChange={(e) => {
                      setProfile({ ...profile, bio: e.target.value });
                      markDirty();
                    }}
                    className="w-full px-3 py-2.5 rounded-sm outline-none resize-none"
                    style={{
                      background: "#131412",
                      border: "1px solid #3A3C37",
                      color: "#EDE9DE",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "14px",
                    }}
                  />
                </label>
              </div>
            )}

            {active === "notifications" && (
              <div>
                <SectionHeader ch="02" title="Notify" sub="alert routing" />
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Rocker
                    label="EMAIL DIGEST"
                    checked={notify.digest}
                    onChange={(v) => {
                      setNotify({ ...notify, digest: v });
                      markDirty();
                    }}
                  />
                  <Rocker
                    label="PUSH ALERTS"
                    checked={notify.push}
                    onChange={(v) => {
                      setNotify({ ...notify, push: v });
                      markDirty();
                    }}
                  />
                  <Rocker
                    label="MENTIONS"
                    checked={notify.mentions}
                    onChange={(v) => {
                      setNotify({ ...notify, mentions: v });
                      markDirty();
                    }}
                  />
                  <Rocker
                    label="MARKETING"
                    checked={notify.marketing}
                    onChange={(v) => {
                      setNotify({ ...notify, marketing: v });
                      markDirty();
                    }}
                  />
                </div>
                <Fader
                  label="DIGEST FREQUENCY"
                  value={notify.frequency}
                  onChange={(v) => {
                    setNotify({ ...notify, frequency: v });
                    markDirty();
                  }}
                />
              </div>
            )}

            {active === "appearance" && (
              <div>
                <SectionHeader ch="03" title="Display" sub="visual output" />
                <div className="mb-4">
                  <span
                    className="block text-xs tracking-widest mb-2"
                    style={{ color: "#8B8A7E", fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    THEME
                  </span>
                  <div className="flex gap-2">
                    {["dark", "light", "auto"].map((th) => (
                      <button
                        key={th}
                        onClick={() => {
                          setAppearance({ ...appearance, theme: th });
                          markDirty();
                        }}
                        className="px-4 py-2 rounded-sm text-xs uppercase"
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          letterSpacing: "0.08em",
                          background:
                            appearance.theme === th ? "#3A3420" : "#131412",
                          border:
                            appearance.theme === th
                              ? "1px solid #E8C468"
                              : "1px solid #3A3C37",
                          color: appearance.theme === th ? "#E8C468" : "#8B8A7E",
                        }}
                      >
                        {th}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <Fader
                    label="TEXT SIZE"
                    value={appearance.fontSize}
                    onChange={(v) => {
                      setAppearance({ ...appearance, fontSize: v });
                      markDirty();
                    }}
                  />
                </div>
                <div>
                  <span
                    className="block text-xs tracking-widest mb-2"
                    style={{ color: "#8B8A7E", fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    ACCENT
                  </span>
                  <div className="flex gap-2.5">
                    {ACCENTS.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => {
                          setAppearance({ ...appearance, accent: a.id });
                          markDirty();
                        }}
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "3px",
                          background: a.hex,
                          border:
                            appearance.accent === a.id
                              ? "2px solid #EDE9DE"
                              : "2px solid transparent",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {active === "security" && (
              <div>
                <SectionHeader ch="04" title="Secure" sub="access control" />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Field label="NEW PASSWORD" type="password" value="" onChange={() => markDirty()} placeholder="••••••••" />
                  <Field label="CONFIRM PASSWORD" type="password" value="" onChange={() => markDirty()} placeholder="••••••••" />
                </div>
                <Rocker
                  label="TWO-FACTOR AUTH"
                  checked={security.twoFactor}
                  onChange={(v) => {
                    setSecurity({ ...security, twoFactor: v });
                    markDirty();
                  }}
                />
                <div className="mt-5">
                  <span
                    className="block text-xs tracking-widest mb-2"
                    style={{ color: "#8B8A7E", fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    ACTIVE SESSIONS
                  </span>
                  {[
                    { device: "MacBook Pro — Lahore", current: true },
                    { device: "iPhone 15 — Gujranwala", current: false },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-3 py-2.5 mb-2 rounded-sm"
                      style={{ background: "#131412", border: "1px solid #3A3C37" }}
                    >
                      <span
                        className="text-xs"
                        style={{ color: "#B8B6A8", fontFamily: "'Inter', sans-serif" }}
                      >
                        {s.device} {s.current && "(this device)"}
                      </span>
                      {!s.current && (
                        <button
                          className="text-xs"
                          style={{ color: "#B4694A", fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          REVOKE
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderTop: "1px solid #34362F", background: "#181A17" }}
        >
          <div className="flex items-center gap-2">
            {saved && (
              <>
                <Check size={13} color="#8FA07E" />
                <span
                  className="text-xs"
                  style={{ color: "#8FA07E", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Changes saved
                </span>
              </>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              disabled={!dirty}
              className="px-5 py-2.5 rounded-sm text-xs uppercase flex items-center gap-1.5"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.08em",
                color: dirty ? "#B8B6A8" : "#4A4A44",
                border: "1px solid #3A3C37",
                opacity: dirty ? 1 : 0.5,
              }}
            >
              <X size={12} /> Reset
            </button>
            <button
              onClick={handleSave}
              disabled={!dirty}
              className="px-6 py-2.5 rounded-sm text-xs uppercase font-medium"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.08em",
                background: dirty ? "#E8C468" : "#3A3C37",
                color: dirty ? "#1C1E1B" : "#6B6A5E",
                cursor: dirty ? "pointer" : "default",
              }}
            >
              Engage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
