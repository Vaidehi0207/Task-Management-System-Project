"use client";

import { useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Mail, Lock } from "lucide-react";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/auth/register", { email, password });
            toast.success("Account created! Please login.");
            router.push("/login");
        } catch (err: any) {
            const message = err.response?.data?.message || "Registration failed";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="glass-card animate-fade-in" style={{ width: '400px', padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Register</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Create a new account</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ position: 'relative' }}>
                        <Mail size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', paddingLeft: '40px' }}
                            required
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', paddingLeft: '40px' }}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ marginTop: '12px' }} disabled={loading}>
                        {loading ? "Creating account..." : "Register"}
                    </button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Already have an account? <Link href="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Login</Link>
                </div>
            </div>
        </div>
    );
}
