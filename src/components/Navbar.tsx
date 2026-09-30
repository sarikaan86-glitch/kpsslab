import React, { useState } from 'react';
import {
  Clock,
  Edit3,
  FileSpreadsheet,
  Flag,
  RotateCcw,
  Sun,
  Moon,
  CheckCircle2,
  Sparkles,
  LogOut,
  User as UserIcon,
  Headphones,
  Layers,
  Target,
  Flame,
} from 'lucide-react';
import { formatTime } from '../utils/kpssScoring';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { soundFx } from '../utils/soundEffects';
import { PWAInstallButton } from './PWAInstallButton';
import { FullscreenToggle } from './FullscreenToggle';

interface NavbarProps {
  currentView: 'home' | 'exam' | 'results' | 'subject_bank';
  onNavigateHome: () => void;
  onNavigateSubjectBank?: () => void;
  timeRemaining?: number;
  totalAnswered?: number;
  totalMarked?: number;
  totalQuestions?: number;
  examTitle?: string;
  onOpenOpticalSheet?: () => void;
  onOpenScratchpad?: () => void;
  onFinishExamPrompt?: () => void;
  onNewExam?: () => void;
  onRenewQuestions?: () => void;
  onOpenGroundedNews?: () => void;
  onOpenFlashcards?: () => void;
  onOpenStreakModal?: () => void;
  streakCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigateHome,
  onNavigateSubjectBank,
  timeRemaining = 0,
  totalAnswered = 0,
  totalMarked = 0,
  totalQuestions = 120,
  examTitle,
  onOpenOpticalSheet,
  onOpenScratchpad,
  onFinishExamPrompt,
  onNewExam,
  onRenewQuestions,
  onOpenGroundedNews,
  onOpenFlashcards,
  onOpenStreakModal,
  streakCount = 1,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, loginWithGoogle, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isZenPlaying, setIsZenPlaying] = useState(false);
  const isTimeWarning = timeRemaining <= 300 && timeRemaining > 0;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E5E5EA] dark:border-white/10 bg-[#FBFBFD]/90 dark:bg-[#000000]/90 backdrop-blur-2xl transition-colors duration-200">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-left focus-visible:outline-none cursor-pointer group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0071E3] dark:bg-[#0071E3] text-white font-bold text-sm tracking-tight shadow-sm group-hover:scale-105 transition-transform ring-1 ring-white/20">
              K
            </div>
            <div className="leading-tight">
              <span className="text-base font-black tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
                KPSS<span className="text-[#0071E3] dark:text-[#2997FF]">LAB</span>
              </span>
            </div>
          </button>

          {currentView === 'exam' && (
            <div className="hidden lg:flex items-center text-xs text-[#86868B] dark:text-[#A1A1A6] border-l border-[#D2D2D7] dark:border-white/10 pl-3 ml-1">
              <span className="truncate max-w-[220px] font-medium">{examTitle || '2026 KPSS Özgün Deneme'}</span>
            </div>
          )}

          {/* 100 Soru Branş Bankası Navigation Button */}
          {onNavigateSubjectBank && (
            <button
              type="button"
              onClick={onNavigateSubjectBank}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                currentView === 'subject_bank'
                  ? 'bg-[#0071E3] text-white shadow-xs'
                  : 'text-[#86868B] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white bg-[#F5F5F7] dark:bg-[#1C1C1F] border border-[#E5E5EA] dark:border-white/10'
              }`}
              title="Her Ders İçin 100 Soru Tek Tek Çöz"
            >
              <Target className="w-3.5 h-3.5" />
              <span>100 Soru Branş Bankası</span>
            </button>
          )}

          {currentView === 'home' && onRenewQuestions && (
            <button
              type="button"
              onClick={onRenewQuestions}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#0071E3] dark:text-[#2997FF] bg-[#0071E3]/8 dark:bg-[#0071E3]/20 hover:bg-[#0071E3]/15 border border-[#0071E3]/20 transition-all cursor-pointer"
              title="Soruları Karıştır ve Yeni Soru Seti Oluştur"
            >
              <Sparkles className="w-3 h-3" />
              <span>Soruları Yenile</span>
            </button>
          )}
        </div>

        {/* Center Zone: Live Exam Stats, Auto-save indicator & Timer */}
        {currentView === 'exam' && (
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Auto-save Status Pill */}
            <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200/60 dark:border-emerald-800/40">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Kayıt Aktif</span>
            </div>

            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold tabular-numbers transition-colors ${
                isTimeWarning
                  ? 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 animate-pulse border border-red-200 dark:border-red-800'
                  : 'bg-white dark:bg-[#1C1C1E] text-[#1D1D1F] dark:text-[#F5F5F7] border border-[#E5E5EA] dark:border-white/10 shadow-xs'
              }`}
            >
              <Clock className="w-4 h-4 text-[#86868B] dark:text-[#A1A1A6]" />
              <span>{formatTime(timeRemaining)}</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-[#86868B] dark:text-[#A1A1A6] bg-[#F5F5F7] dark:bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#E5E5EA] dark:border-white/10">
              <span>
                Cevap: <strong className="text-[#1D1D1F] dark:text-[#F5F5F7]">{totalAnswered}</strong>/{totalQuestions}
              </span>
              {totalMarked > 0 && (
                <>
                  <span className="text-[#D2D2D7] dark:text-white/20">|</span>
                  <span className="flex items-center gap-1 text-[#FF9500]">
                    <Flag className="w-3 h-3 fill-current" />
                    <strong>{totalMarked}</strong>
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Actions Zone: Dark mode switch & Controls */}
        <div className="flex items-center gap-2">
          {/* Dark / Light Mode Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Aydınlık Moda Geç' : 'Karanlık Moda Geç'}
            className="p-2 rounded-xl text-[#86868B] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-white/10 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] transition-all cursor-pointer shadow-2xs"
            aria-label="Tema Değiştir"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Fullscreen Mode Toggle */}
          <FullscreenToggle />

          {/* Daily Study Streak Badge (🔥 Streak) */}
          {onOpenStreakModal && (
            <button
              type="button"
              onClick={onOpenStreakModal}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-black bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/60 shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="Günlük Çalışma Serisi (🔥 Streak)"
            >
              <Flame className="w-3.5 h-3.5 fill-current text-orange-500" />
              <span className="tabular-numbers">{streakCount} Gün</span>
            </button>
          )}

          {/* PWA In-App Install Button (Uygulama Olarak İndir) */}
          <PWAInstallButton />

          {/* Google Search Grounded 2026 Current Affairs Button */}
          {onOpenGroundedNews && (
            <button
              type="button"
              onClick={onOpenGroundedNews}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-90 shadow-2xs transition-all cursor-pointer"
              title="Google Arama Verisiyle 2026 Güncel Bilgiler ve Soru Tahmini"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Canlı Güncel</span>
            </button>
          )}

          {/* Flashcards Modal Trigger */}
          {onOpenFlashcards && (
            <button
              type="button"
              onClick={onOpenFlashcards}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] bg-white dark:bg-[#1C1C1E] border border-[#D2D2D7] dark:border-white/10 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] transition-all cursor-pointer shadow-2xs"
              title="Apple Cüzdan Stili KPSS Hafıza Kartları"
            >
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span>Hafıza Kartları</span>
            </button>
          )}

          {/* Zen Ambient Focus Audio Button */}
          <button
            type="button"
            onClick={() => {
              const active = soundFx.toggleAmbient('library');
              setIsZenPlaying(active);
            }}
            className={`p-2 rounded-xl border transition-all cursor-pointer shadow-2xs ${
              isZenPlaying
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700 animate-pulse'
                : 'text-[#86868B] dark:text-[#A1A1A6] bg-white dark:bg-[#1C1C1E] border-[#E5E5EA] dark:border-white/10 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E]'
            }`}
            title={isZenPlaying ? 'Kütüphane Odak Sesini Durdur' : 'Kütüphane Odak Ambiyansı Başlat (Zen Modu)'}
          >
            <Headphones className="w-4 h-4" />
          </button>

          {/* User Auth (Google Sign-In / User Profile Avatar) */}
          <div className="relative">
            {currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowUserMenu((p) => !p)}
                  className="flex items-center gap-1.5 p-1 rounded-full bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-white/15 hover:ring-2 hover:ring-[#0071E3] transition-all cursor-pointer"
                  title={currentUser.displayName || 'Profilim'}
                >
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'Kullanıcı'}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#0071E3] text-white flex items-center justify-center text-xs font-bold">
                      {currentUser.displayName?.charAt(0) || 'K'}
                    </div>
                  )}
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-10 w-52 bg-white dark:bg-[#1C1C1E] rounded-2xl shadow-xl border border-[#E5E5EA] dark:border-white/15 p-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-2 border-b border-[#F0F0F2] dark:border-white/10">
                      <p className="text-xs font-bold text-[#1D1D1F] dark:text-[#F5F5F7] truncate">
                        {currentUser.displayName || 'KPSS Adayı'}
                      </p>
                      <p className="text-[11px] text-[#86868B] dark:text-[#A1A1A6] truncate">
                        {currentUser.email}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Çıkış Yap</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={loginWithGoogle}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] bg-white dark:bg-[#1C1C1E] border border-[#D2D2D7] dark:border-white/10 rounded-xl hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] transition-all cursor-pointer shadow-2xs"
                title="Google Hesabı ile Giriş Yap"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="hidden sm:inline">Giriş Yap</span>
              </button>
            )}
          </div>

          {currentView === 'exam' && (
            <>
              <button
                type="button"
                onClick={onOpenScratchpad}
                title="Karalama Tahtası"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7] bg-white dark:bg-[#1C1C1E] border border-[#D2D2D7] dark:border-white/10 rounded-xl hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#86868B] dark:text-[#A1A1A6]" />
                <span>Karalama</span>
              </button>

              <button
                type="button"
                onClick={onOpenOpticalSheet}
                title="Optik Cevap Formu"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7] bg-white dark:bg-[#1C1C1E] border border-[#D2D2D7] dark:border-white/10 rounded-xl hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] transition-colors cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#0071E3] dark:text-[#2997FF]" />
                <span className="hidden sm:inline">Optik Form</span>
              </button>

              <button
                type="button"
                onClick={onFinishExamPrompt}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0071E3] hover:bg-[#0077ED] rounded-xl shadow-xs transition-colors whitespace-nowrap cursor-pointer"
              >
                Sınavı Bitir
              </button>
            </>
          )}

          {currentView === 'results' && (
            <button
              type="button"
              onClick={onNewExam}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0071E3] hover:bg-[#0077ED] rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Yeni Deneme</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
