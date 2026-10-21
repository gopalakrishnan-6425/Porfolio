import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import SectionHeading from "../components/SectionHeading.jsx";
import SpotlightCard from "../components/SpotlightCard.jsx";
import Reveal from "../components/Reveal.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { profile } from "../data/profile.js";
import SocialLinks from "../components/SocialLinks.jsx";
import ResumeButton from "../components/ResumeButton.jsx";

export default function Contact() {
  useDocumentTitle("Contact");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [validated, setValidated] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  // FormSubmit delivers messages without requiring the visitor to configure an email app.
  const submit = async (e) => {
    e.preventDefault();
    setValidated(true);
    if (!e.currentTarget.checkValidity()) return;
    setSending(true);
    setStatus("");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio enquiry from ${form.name}`,
        }),
      });
      const result = await response.json();
      if (!response.ok || (result.success !== true && result.success !== "true")) {
        throw new Error(result.message || "Message could not be sent.");
      }
      setStatus("Thanks! Your message was sent. I’ll get back to you by email.");
      setForm({ name: "", email: "", message: "" });
      setValidated(false);
    } catch {
      setStatus("Sorry, your message could not be sent. Please email me directly using the address shown here.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="gs-section">
      <SectionHeading eyebrow="Contact" title="Let&rsquo;s work together." />
      <Row className="g-4">
        <Col lg={7}>
          <Reveal className="h-100">
            <SpotlightCard>
              <h3 className="mb-4">Send a message</h3>
              <Form noValidate validated={validated} onSubmit={submit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Label htmlFor="n">Name</Form.Label>
                    <Form.Control
                      id="n"
                      className="gs-input"
                      name="name"
                      required
                      value={form.name}
                      onChange={set("name")}
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Label htmlFor="e">Email</Form.Label>
                    <Form.Control
                      id="e"
                      type="email"
                      className="gs-input"
                      name="email"
                      required
                      value={form.email}
                      onChange={set("email")}
                    />
                  </Col>
                  <Col xs={12}>
                    <Form.Label htmlFor="m">Message</Form.Label>
                    <Form.Control
                      id="m"
                      as="textarea"
                      rows={5}
                      className="gs-input"
                      name="message"
                      required
                      value={form.message}
                      onChange={set("message")}
                    />
                  </Col>
                  <Col xs={12}>
                    <button type="submit" className="gs-btn primary" disabled={sending}>
                      {sending ? "Sending…" : "Send message"}
                    </button>
                  </Col>
                  {status && (
                    <Col xs={12}>
                      <p className="mb-0" role="status" aria-live="polite">{status}</p>
                    </Col>
                  )}
                </Row>
              </Form>
            </SpotlightCard>
          </Reveal>
        </Col>
        <Col lg={5} className="d-grid gap-4">
          <Reveal delay={90}>
            <SpotlightCard>
              <h3>Get in touch</h3>
              <a className="gs-mail" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <p>{profile.location}</p>
            </SpotlightCard>
          </Reveal>
          <Reveal delay={180}>
            <SpotlightCard>
              <h3 className="mb-2">Profiles and resume</h3>
              <div className="mb-4">
                <SocialLinks />
              </div>
              <ResumeButton />
            </SpotlightCard>
          </Reveal>
        </Col>
      </Row>
    </section>
  );
}
