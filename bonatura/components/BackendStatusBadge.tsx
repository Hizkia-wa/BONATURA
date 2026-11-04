"use client";

import React, { useEffect, useState } from "react";
import { Server, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { checkBackendHealth } from "@/lib/api";

interface BackendStatusBadgeProps {
  onRefresh?: () => void;
  className?: string;
}

export default function BackendStatusBadge({
  onRefresh,
  className = "",
}: BackendStatusBadgeProps) {
  const [status, setStatus] = useState<{
    isOnline: boolean;
    database: string;
    service: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const checkStatus = async () => {
    setLoading(true);
    const res = await checkBackendHealth();
    setStatus(res);
    setLoading(false);
  };

  useEffect(() => {
    checkStatus();
    // Poll every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = async () => {
    await checkStatus();
    if (onRefresh) onRefresh();
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
        status?.isOnline
          ? "bg-emerald-50 text-emerald-900 border-emerald-300"
          : "bg-[#D6C4A8]/40 text-[#3E2723] border-[#D6C4A8]"
      } ${className}`}
    >
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          {status?.isOnline && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              status?.isOnline ? "bg-emerald-600" : "bg-amber-600"
            }`}
          ></span>
        </span>
        <Server className="w-3.5 h-3.5 text-[#795548]" />
        <span>
          {loading
            ? "Mengecek Backend..."
            : status?.isOnline
            ? "API Backend Aktif (:8080)"
            : "Data Terpadu (Offline Ready)"}
        </span>
      </div>

      <button
        onClick={handleManualRefresh}
        title="Refresh status koneksi backend"
        className="p-0.5 hover:text-[#B85C38] transition-colors rounded"
        disabled={loading}
      >
        <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
      </button>
    </div>
  );
}

