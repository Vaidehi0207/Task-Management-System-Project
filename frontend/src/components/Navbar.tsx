"use client";

import { useAuth } from "@/context/AuthContext";
import { LogOut, CheckSquare } from "lucide-react";

export default function Navbar() {
    const { logout, user } = useAuth();

    return (
        <nav className="glass-card" style={{
            margin: '20px',
            padding: '16px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '12px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckSquare size={32} color="var(--primary)" />
                <span style={{ fontSize: '20px', fontWeight: 'bold', letterSpacing: '1px' }}>AURA TASKS</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <span style={{ color: 'var(--text-muted)' }}>{user?.email}</span>
                <button onClick={logout} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </nav>
    );
}
