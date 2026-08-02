import { useEffect, useRef } from "react";

export default function GalaxyBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Resize handler
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Neural Net node configuration
    const numNodes = 75;
    const nodes = [];
    const maxDistance = 150;
    const colors = ["#00f2fe", "#9d4edd", "#ff007f", "#38bdf8", "#818cf8"];

    // Initialize neural nodes
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: Math.random() * 0.05 + 0.01,
        pulseFactor: Math.random(),
        isActive: Math.random() > 0.8 // Firing neuron
      });
    }

    // Mouse tracking
    let mouse = { x: null, y: null };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Nebula glow points
    const nebulas = [
      { x: 0.2, y: 0.3, radius: 0.4, color: "rgba(157, 78, 221, 0.05)" },
      { x: 0.8, y: 0.7, radius: 0.5, color: "rgba(0, 242, 254, 0.05)" }
    ];

    let time = 0;
    const animate = () => {
      time += 0.001;

      // Space background
      ctx.fillStyle = "#030013";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw underlying nebulas for cosmic atmosphere
      nebulas.forEach((neb) => {
        const cx = canvas.width * neb.x;
        const cy = canvas.height * neb.y;
        const r = Math.min(canvas.width, canvas.height) * neb.radius;
        const shiftX = Math.sin(time * 2) * 15;
        const shiftY = Math.cos(time * 3) * 15;

        const grad = ctx.createRadialGradient(cx + shiftX, cy + shiftY, 0, cx + shiftX, cy + shiftY, r);
        grad.addColorStop(0, neb.color);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx + shiftX, cy + shiftY, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update Node Positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Node pulse
        node.pulseFactor += node.pulseSpeed;
      });

      // Draw Connections (Synapses)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];

          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.15;
            ctx.strokeStyle = n1.isActive ? `rgba(0, 242, 254, ${alpha * 1.5})` : `rgba(157, 78, 221, ${alpha})`;
            ctx.lineWidth = n1.isActive && n2.isActive ? 1.2 : 0.6;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }

        // Draw connections to mouse
        if (mouse.x !== null && mouse.y !== null) {
          const node = nodes[i];
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance * 1.2) {
            const alpha = (1 - dist / (maxDistance * 1.2)) * 0.25;
            ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Draw Nodes (Neurons)
      nodes.forEach((node) => {
        const pulse = Math.abs(Math.sin(node.pulseFactor));
        const glowRadius = node.radius + (node.isActive ? pulse * 3 : pulse * 1.5);

        ctx.shadowBlur = node.isActive ? 12 : 6;
        ctx.shadowColor = node.color;
        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.isActive ? 0.9 : 0.6;

        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Inner bright core
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-50 pointer-events-none"
    />
  );
}
