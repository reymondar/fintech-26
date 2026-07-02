"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What exactly does GROUNDED do?",
    answer:
      "We're a dev studio that makes AI choose you: we build the data infrastructure and authority that make ChatGPT, Perplexity, Gemini and Google AI Overviews read you, trust you and recommend you. We don't just write blogs. We structure your data so machines understand it, build the trust signals that earn citations, and get your business ready for what's next: AI agents that don't just mention you — they transact with you. GEO is the door; engineering is what makes us better at it.",
  },
  {
    question: "Why a dev studio and not an SEO agency?",
    answer:
      "Because most of the market only writes content; we build. A tool shows you you're invisible. A content agency writes articles. We do both halves that almost nobody combines under one roof: machine-readable data engineering and the authority that turns it into real citations. The fact that we can actually build — not just recommend — is what separates us from the hundreds doing the same thing. And yes: once you're in, we build whatever you need, from automations to internal systems.",
  },
  {
    question: "What is GEO and why should I care now?",
    answer:
      "GEO (Generative Engine Optimization) is structuring your business so AI cites you as a source when someone asks — and it matters now because the click is dying. Google stopped distributing traffic: it's down roughly a third year-over-year, and most searches end with zero clicks. Your buyers don't browse ten links anymore; they ask, and the AI answers with a name. GEO decides whether that name is yours or your competitor's. The window to arrive early is now; in two years it'll be table stakes.",
  },
  {
    question: "I already invest in SEO. Isn't this the same thing paid twice?",
    answer:
      "No: your SEO works to rank on Google; GEO works to get you cited in AI responses — two distinct surfaces where your buyer searches. They share foundations, so we don't duplicate effort — we build on top of what you already have instead of redoing it. Think of it this way: SEO gets you the click Google still sends; GEO gets you the mention in the conversation that's eating that click. Ignoring either one means ceding half the field.",
  },
  {
    question: "How do I know this works if I can't see a \"ranking\"?",
    answer:
      "We measure it with your Share of Model: how often AI names you versus your competitors, using the same set of questions every month. There's no classic \"ranking\" because models don't order links — they synthesize answers. So instead of a position, we give you a real number and its trend, plus the queries where you appear and where you don't. Honesty first: there is no \"Search Console for AI\" yet, so this is measured with our own methodology, not an official metric. But what isn't measured can't be defended.",
  },
  {
    question: "Do you guarantee the AI will recommend me?",
    answer:
      "No, and be wary of anyone who does: models are probabilistic, and roughly 70% of cited pages rotate every 2–3 months without anyone touching anything. What we do is build your position and defend it month over month as the models shift. Promising \"guaranteed citations\" in a system that fluctuates by design is smoke — we'd rather tell you the technical truth than sell you one we can't deliver. That honesty is precisely why our clients stay.",
  },
  {
    question: "We're a \"boring\" business (industrial, B2B, niche). Is this for us?",
    answer:
      "Especially for you: the more technical and specialized your sector, the less GEO competition you have and the more direct the results. When an industrial buyer asks AI \"who manufactures X with Y certification,\" they're not looking for a brand — they're looking for capability. If your capability sheet isn't structured for a machine to read, that order goes to someone else. \"Boring\" businesses are usually invisible online and have real budgets: the perfect combination for this to actually move the needle.",
  },
  {
    question: "Do you have to rebuild my website?",
    answer:
      "No: we build the machine-readable data layer on top of your current site, with no migration or redesign. We structure and expose your information so AI understands it without guessing, respecting your design and your stack. And since we're developers, if something custom worth building comes up, we can do it — but it's never a requirement to start. You begin with an audit, not a construction project.",
  },
]

export function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="faq" ref={ref} className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            <span className="block">Frequently asked questions.</span>
            <span className="block text-zinc-400">The honest answers.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-zinc-200">
                <AccordionTrigger className="text-left text-zinc-900 hover:text-zinc-700 text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-500 text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
