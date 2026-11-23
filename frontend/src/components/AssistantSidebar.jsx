import React, { useState } from 'react';
import { 
  Plus, MessageSquare, Trash2, Edit2, Check, X, 
  Settings, ChevronLeft, ChevronRight, Sparkles, Bot, Globe
} from 'lucide-react';

export default function AssistantSidebar({
  conversations,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  onRenameSession,
  isOpen,
  onToggleOpen,
  onOpenSettings
}) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleStartRename = (e, session) => {
    e.stopPropagation();
    setEditingId(session.id);
    setEditTitle(session.title || 'New Conversation');
  };

  const handleSaveRename = (e, id) => {
    e.stopPropagation();
    if (editTitle.trim()) {
      onRenameSession(id, editTitle.trim());
    }
    setEditingId(null);
  };

  const handleCancelRename = (e) => {
    e.stopPropagation();
    setEditingId(null);
  };

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div 
          onClick={onToggleOpen}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      {/* Main Drawer / Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        flex flex-col h-full bg-[#090d16] border-r border-white/[0.06] text-slate-300
        transition-all duration-300 ease-in-out select-none
        ${isOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full md:w-0 md:translate-x-0 overflow-hidden'}
      `}>
        
        {/* Sidebar Header / Brand / New Chat */}
        <div className="p-3 border-b border-white/[0.06] space-y-3 shrink-0">
          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-[#07131e] font-black text-xs shadow-sm">
                BB
              </div>
              <span className="font-bold text-sm tracking-wide text-white">
                BhashaBridge <span className="text-cyan-400 font-mono text-xs">AI</span>
              </span>
            </div>

            <button
              type="button"
              onClick={onToggleOpen}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition md:flex cursor-pointer"
              title="Close sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* New Chat Button */}
          <button
            type="button"
            onClick={onNewChat}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] hover:border-sky-500/40 text-white text-xs font-semibold shadow-xs transition group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Plus className="w-4 h-4 text-cyan-400 group-hover:rotate-90 transition-transform duration-200" />
              <span>New Conversation</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono border border-white/[0.06] px-1.5 py-0.5 rounded">
              Ctrl+K
            </span>
          </button>
        </div>

        {/* Conversations History List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-white/10">
          <div className="px-2 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Recent Conversations
          </div>

          {conversations.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-400 space-y-1">
              <MessageSquare className="w-5 h-5 mx-auto text-slate-400" />
              <p>No previous conversations.</p>
            </div>
          ) : (
            conversations.map((sess) => {
              const isActive = sess.id === activeSessionId;
              const isEditing = editingId === sess.id;

              return (
                <div
                  key={sess.id}
                  onClick={() => onSelectSession(sess.id)}
                  className={`group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition cursor-pointer ${
                    isActive 
                      ? 'bg-sky-500/15 text-cyan-200 border border-sky-400/25 font-semibold' 
                      : 'text-slate-300 hover:bg-white/[0.04] hover:text-white border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-2">
                    <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    
                    {isEditing ? (
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveRename(e, sess.id);
                          if (e.key === 'Escape') handleCancelRename(e);
                        }}
                        autoFocus
                        className="w-full bg-black/40 text-white px-1.5 py-0.5 rounded border border-cyan-400/50 text-xs focus:outline-hidden"
                      />
                    ) : (
                      <span className="truncate text-xs">
                        {sess.title || 'Untitled Conversation'}
                      </span>
                    )}
                  </div>

                  {/* Actions (Rename / Delete) */}
                  {isEditing ? (
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleSaveRename(e, sess.id)}
                        className="p-1 text-emerald-400 hover:text-emerald-300"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelRename}
                        className="p-1 text-rose-400 hover:text-rose-300"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="hidden group-hover:flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleStartRename(e, sess)}
                        className="p-1 text-slate-400 hover:text-cyan-300 transition"
                        title="Rename"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSession(sess.id);
                        }}
                        className="p-1 text-slate-400 hover:text-rose-400 transition"
                        title="Delete conversation"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar Footer (Settings & Multilingual Info) */}
        <div className="p-3 border-t border-white/[0.06] space-y-2 shrink-0 bg-[#070b12]">
          <button
            type="button"
            onClick={onOpenSettings}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Voice & AI Settings</span>
            </div>
            <span className="text-[10px] text-cyan-400 font-mono">v2.0</span>
          </button>
          
          <div className="px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[10px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-cyan-400" />
              Telugu • Hindi • English
            </span>
            <span className="text-emerald-400 font-semibold font-mono">100% Free</span>
          </div>
        </div>

      </aside>
    </>
  );
}
