"use client";

import { useMemo, useState } from "react";

type Mode = "image" | "text" | "script";

const modeCopy: Record<Mode, { title: string; hint: string }> = {
  image: {
    title: "Image → Video",
    hint: "Upload a still image and describe the motion, camera move and mood."
  },
  text: {
    title: "Text → Video",
    hint: "Describe a scene and turn your prompt into a generated clip."
  },
  script: {
    title: "Script → Video",
    hint: "Paste a script. The full version will split it into scenes, narration and clips."
  }
};

export default function Home() {
  const [mode, setMode] = useState<Mode>("image");
  const [prompt, setPrompt] = useState("");
  const [fileName, setFileName] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("Ready to create.");

  const actionText = useMemo(() => (busy ? "Preparing generation…" : "Generate video"), [busy]);

  async function generate() {
    if (!prompt.trim() && mode !== "image") {
      setMessage("Add a prompt or script first.");
      return;
    }
    if (mode === "image" && !fileName) {
      setMessage("Choose an image first.");
      return;
    }

    setBusy(true);
    setMessage("Submitting your generation…");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, prompt, fileName })
      });
      const data = await res.json();
      setMessage(data.message ?? "Generation queued.");
    } catch {
      setMessage("Could not start generation. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      <nav className="nav shell">
        <div className="brand"><span className="brandMark">A</span><span>ArtistStudio <b>AI Video</b></span></div>
        <div className="navActions"><button className="ghost">History</button><button className="ghost">Pricing</button><button className="login">Sign in</button></div>
      </nav>

      <section className="hero shell">
        <div className="eyebrow">AI VIDEO CREATION STUDIO</div>
        <h1>Turn a picture, idea or script into <span>video.</span></h1>
        <p>Create cinematic AI clips from images and text, then build complete narrated videos from scripts.</p>
        <div className="chips"><span>Image → Video</span><span>Text → Video</span><span>Script → Video</span><span>AI Voice next</span></div>
      </section>

      <section className="studio shell">
        <div className="tabs">
          {(["image", "text", "script"] as Mode[]).map((item) => (
            <button key={item} className={mode === item ? "tab active" : "tab"} onClick={() => setMode(item)}>
              {modeCopy[item].title}
            </button>
          ))}
        </div>

        <div className="workspace">
          <div className="controls">
            <div>
              <h2>{modeCopy[mode].title}</h2>
              <p className="muted">{modeCopy[mode].hint}</p>
            </div>

            {mode === "image" && (
              <label className="dropzone">
                <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")} />
                <span className="uploadIcon">＋</span>
                <strong>{fileName || "Upload an image"}</strong>
                <small>JPG, PNG or WEBP</small>
              </label>
            )}

            <label className="field">
              <span>{mode === "script" ? "Your script" : "Prompt"}</span>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={mode === "script" ? "Paste your script here…" : "Example: Slow cinematic camera push-in, wind moving through the hair, realistic lighting…"}
                rows={mode === "script" ? 9 : 6}
              />
            </label>

            <div className="options">
              <label><span>Aspect ratio</span><select defaultValue="16:9"><option>16:9</option><option>9:16</option><option>1:1</option></select></label>
              <label><span>Length</span><select defaultValue="5 sec"><option>5 sec</option><option>10 sec</option></select></label>
              <label><span>Quality</span><select defaultValue="Fast"><option>Fast</option><option>Cinematic</option></select></label>
            </div>

            <button className="generate" onClick={generate} disabled={busy}>{actionText}</button>
            <div className="status">{message}</div>
          </div>

          <div className="preview">
            <div className="previewFrame">
              <div className="play">▶</div>
              <strong>Your generated video will appear here</strong>
              <span>Generation history and downloads will be added in the next stage.</span>
            </div>
            <div className="previewStats"><div><small>MODEL</small><b>Auto</b></div><div><small>CREDITS</small><b>0 used</b></div><div><small>STATUS</small><b>Prototype</b></div></div>
          </div>
        </div>
      </section>

      <section className="features shell">
        <article><span>01</span><h3>One creative workspace</h3><p>Image, prompt and script workflows live in the same product.</p></article>
        <article><span>02</span><h3>Provider-ready backend</h3><p>The API route is isolated so we can connect Kling, Veo, Runway or another provider without rebuilding the UI.</p></article>
        <article><span>03</span><h3>Subscription-ready</h3><p>Credits, user accounts and Stripe can be added after generation is working reliably.</p></article>
      </section>

      <footer className="shell">ArtistStudio AI Video · MVP starter</footer>
    </main>
  );
}
