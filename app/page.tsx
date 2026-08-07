"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getPerspective,
  perspectives,
  sources,
  synthesisPrompts,
  wordBank,
  type LocationId,
  type Motivation,
} from "./game-data";

type View = "intro" | "hub" | "encounter" | "journal" | "synthesis";

type SavedProgress = {
  completed: LocationId[];
  asked: Record<LocationId, string[]>;
};

const STORAGE_KEY = "crossroads-crusades-progress-v1";

const emptyAsked = (): Record<LocationId, string[]> => ({
  byzantine: [],
  pope: [],
  knights: [],
  merchants: [],
  commoners: [],
  muslims: [],
});

function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, index) =>
        index % 2 === 1 ? <strong key={index}>{part}</strong> : part,
      )}
    </>
  );
}

function ProgressPips({ completed }: { completed: LocationId[] }) {
  return (
    <div
      className="progress-pips"
      aria-label={`${completed.length} of ${perspectives.length} perspectives recorded`}
    >
      {perspectives.map((perspective) => (
        <span
          className={completed.includes(perspective.id) ? "pip pip-complete" : "pip"}
          key={perspective.id}
          title={perspective.location}
        />
      ))}
    </div>
  );
}

function MotivationTags({
  strongest,
  supporting,
}: {
  strongest: Motivation[];
  supporting: Motivation[];
}) {
  return (
    <div className="motivation-tags">
      {strongest.map((motivation) => (
        <span className={`motivation motivation-${motivation.toLowerCase()}`} key={motivation}>
          {motivation}
        </span>
      ))}
      {supporting.map((motivation) => (
        <span
          className={`motivation motivation-support motivation-${motivation.toLowerCase()}`}
          key={motivation}
        >
          {motivation}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  const [view, setView] = useState<View>("intro");
  const [completed, setCompleted] = useState<LocationId[]>([]);
  const [asked, setAsked] = useState<Record<LocationId, string[]>>(emptyAsked);
  const [activeId, setActiveId] = useState<LocationId | null>(null);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [answerPage, setAnswerPage] = useState(0);
  const [showCheckpoint, setShowCheckpoint] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as SavedProgress;
          setCompleted(parsed.completed ?? []);
          setAsked({ ...emptyAsked(), ...(parsed.asked ?? {}) });
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      setLoaded(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const progress: SavedProgress = { completed, asked };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [asked, completed, loaded]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [view]);

  const activePerspective = activeId ? getPerspective(activeId) : null;
  const activeQuestion = useMemo(
    () =>
      activePerspective?.questions.find((question) => question.id === activeQuestionId) ?? null,
    [activePerspective, activeQuestionId],
  );
  const allComplete = completed.length === perspectives.length;

  function begin() {
    setView("hub");
  }

  function openEncounter(id: LocationId) {
    setActiveId(id);
    setActiveQuestionId(null);
    setAnswerPage(0);
    setShowCheckpoint(completed.includes(id));
    setView("encounter");
  }

  function chooseQuestion(questionId: string) {
    setActiveQuestionId(questionId);
    setAnswerPage(0);
    setShowCheckpoint(false);
  }

  function advanceDialogue() {
    if (!activePerspective || !activeQuestion) return;

    if (answerPage < activeQuestion.answer.length - 1) {
      setAnswerPage((page) => page + 1);
      return;
    }

    const currentAsked = asked[activePerspective.id];
    const nextAsked = currentAsked.includes(activeQuestion.id)
      ? currentAsked
      : [...currentAsked, activeQuestion.id];

    setAsked((previous) => ({
      ...previous,
      [activePerspective.id]: nextAsked,
    }));
    setActiveQuestionId(null);
    setAnswerPage(0);

    if (nextAsked.length === activePerspective.questions.length) {
      setShowCheckpoint(true);
    }
  }

  function recordPerspective() {
    if (!activePerspective) return;
    setCompleted((previous) =>
      previous.includes(activePerspective.id)
        ? previous
        : [...previous, activePerspective.id],
    );
    setActiveId(null);
    setShowCheckpoint(false);
    setView("hub");
  }

  function returnToHub() {
    setActiveId(null);
    setActiveQuestionId(null);
    setShowCheckpoint(false);
    setView("hub");
  }

  function resetProgress() {
    if (!window.confirm("Clear every recorded perspective and restart the investigation?")) {
      return;
    }
    setCompleted([]);
    setAsked(emptyAsked());
    setActiveId(null);
    setView("intro");
  }

  return (
    <main className="game-root">
      {view === "intro" && (
        <section
          className="intro-screen"
          style={{ backgroundImage: 'url("game-assets/hub-crossroads.webp")' }}
        >
          <div className="intro-sky" aria-hidden="true">
            <span className="pixel-cloud cloud-one" />
            <span className="pixel-cloud cloud-two" />
            <span className="skyline skyline-left" />
            <span className="skyline skyline-right" />
          </div>

          <div className="intro-card">
            <p className="eyebrow">Year 8 History · Activity 2</p>
            <h1>The Crossroads<br />of the Crusades</h1>
            <p className="intro-lead">
              Investigate six perspectives on why people joined, supported or resisted the Crusades.
            </p>
            <p className="intro-copy">
              Keep your <strong>Perspectives of the Crusades - Activity 2</strong> worksheet beside you.
              Each interview will direct you to the questions you can complete.
            </p>

            <div className="intro-actions">
              <button className="button button-primary button-large" onClick={begin}>
                {completed.length > 0 ? "Return to the crossroads" : "Enter the crossroads"}
                <span aria-hidden="true">→</span>
              </button>
              <button className="button button-quiet" onClick={() => setShowSources(true)}>
                Read the historian&apos;s note
              </button>
            </div>

            <div className="how-to-play" aria-label="How to play">
              <div><span>1</span><p>Enter a marked location.</p></div>
              <div><span>2</span><p>Ask all three questions.</p></div>
              <div><span>3</span><p>Record the checkpoint evidence on your worksheet.</p></div>
            </div>
          </div>

          <p className="intro-footer">The setting and dialogue are historically informed reconstructions; no dialogue is a historical quotation.</p>
        </section>
      )}

      {view !== "intro" && view !== "encounter" && (
        <header className="game-header">
          <button className="brand-button" onClick={() => setView("hub")} aria-label="Return to town square">
            <span className="brand-mark" aria-hidden="true">X</span>
            <span>
              <strong>The Crossroads</strong>
              <small>Perspectives of the Crusades</small>
            </span>
          </button>

          <div className="header-progress">
            <ProgressPips completed={completed} />
            <span>{completed.length}/6 recorded</span>
          </div>

          <nav className="header-actions" aria-label="Investigation tools">
            <button className="button button-tool" onClick={() => setView("journal")}>Town journal</button>
            <button
              className="button button-tool"
              disabled={!allComplete}
              onClick={() => setView("synthesis")}
              title={allComplete ? "Open the evidence ledger" : "Record all six perspectives first"}
            >
              Evidence ledger
            </button>
          </nav>
        </header>
      )}

      {view === "hub" && (
        <section className="hub-screen">
          <div className="hub-heading">
            <div>
              <p className="eyebrow">The crossroads</p>
              <h2>Choose your next destination</h2>
            </div>
            <p>
              Visit every marked location. Write on your Activity 2 worksheet when each checkpoint opens.
            </p>
          </div>

          <div
            className="town-map"
            aria-label="Interactive mediaeval crossroads"
            style={{ backgroundImage: 'url("game-assets/hub-crossroads.webp")' }}
          >
            <div className="map-ground" aria-hidden="true" />
            {perspectives.map((perspective) => {
              const isComplete = completed.includes(perspective.id);
              return (
                <button
                  className={`location-button ${perspective.mapPosition} ${isComplete ? "location-complete" : ""}`}
                  key={perspective.id}
                  onClick={() => openEncounter(perspective.id)}
                >
                  <span className="location-building" aria-hidden="true">
                    <span className="building-roof" />
                    <span className="building-front">
                      <i /><i /><i />
                    </span>
                    <span className="building-sign">{perspective.mapLabel}</span>
                  </span>
                  <span className="location-copy">
                    <strong>{perspective.location}</strong>
                    <small>{isComplete ? "Perspective recorded" : `Meet ${perspective.character}`}</small>
                  </span>
                  <span className="location-status" aria-hidden="true">{isComplete ? "✓" : "+"}</span>
                </button>
              );
            })}

            <div className="town-square" aria-hidden="true">
              <span className="fountain"><i /></span>
              <strong>Crossroads of time</strong>
              <small>First · Third · Fourth Crusades</small>
            </div>
            <div className="map-scenery scenery-left" aria-hidden="true"><i /><i /><i /></div>
            <div className="map-scenery scenery-right" aria-hidden="true"><i /><i /></div>
          </div>

          <aside className={`hub-callout ${allComplete ? "hub-callout-ready" : ""}`}>
            <span className="callout-icon" aria-hidden="true">{allComplete ? "!" : "?"}</span>
            <div>
              <strong>{allComplete ? "The evidence ledger is now open." : "What am I collecting?"}</strong>
              <p>
                {allComplete
                  ? "Open the evidence ledger to finish the word bank and plan your four critical-thinking responses."
                  : "For each group, identify its actions and strongest religious, political, economic or social motivations."}
              </p>
            </div>
            {allComplete && (
              <button className="button button-primary" onClick={() => setView("synthesis")}>Open evidence ledger</button>
            )}
          </aside>
        </section>
      )}

      {view === "encounter" && activePerspective && (
        <section className={`encounter-screen ${activePerspective.sceneClass}`}>
          <div
            className="encounter-scenery"
            aria-hidden="true"
            style={{ backgroundImage: `url("game-assets/scenes/${activePerspective.id}.webp")` }}
          >
            <span className="scene-window" />
            <span className="scene-column scene-column-left" />
            <span className="scene-column scene-column-right" />
            <span className="scene-prop" />
          </div>

          <header className="encounter-header">
            <button className="button button-back" onClick={returnToHub}>← Town square</button>
            <div>
              <span>{activePerspective.location}</span>
              <ProgressPips completed={completed} />
            </div>
          </header>

          <div className="encounter-stage">
            <div className="portrait-column">
              <div
                className={`portrait-frame portrait-${activePerspective.id}`}
                aria-label={`Portrait of ${activePerspective.character}`}
                style={{ backgroundImage: `url("game-assets/portraits/${activePerspective.id}.webp")` }}
              >
                <div className="pixel-portrait" aria-hidden="true">
                  <span className="portrait-hair" />
                  <span className="portrait-face"><i /><i /><b /></span>
                  <span className="portrait-clothes" />
                </div>
                <span className="portrait-initials">{activePerspective.initials}</span>
              </div>
              <div className="character-label">
                <h2>{activePerspective.character}</h2>
                <p>{activePerspective.role}</p>
              </div>
            </div>

            <div className="dialogue-column">
              {showCheckpoint ? (
                <article className="checkpoint-card">
                  <div className="checkpoint-heading">
                    <span>✓</span>
                    <div>
                      <p className="eyebrow">Worksheet checkpoint</p>
                      <h3>Write this down before you leave</h3>
                    </div>
                  </div>
                  <p className="checkpoint-route">{activePerspective.checkpoint.worksheet}</p>
                  <ul>
                    {activePerspective.checkpoint.evidence.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <div className="checkpoint-actions">
                    <button className="button button-quiet" onClick={() => setShowCheckpoint(false)}>
                      Review questions
                    </button>
                    <button className="button button-primary" onClick={recordPerspective}>
                      {completed.includes(activePerspective.id) ? "Return to town square" : "Record perspective"}
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </article>
              ) : activeQuestion ? (
                <article className="dialogue-card">
                  <div className="player-question">
                    <span>You ask</span>
                    <p>{activeQuestion.prompt}</p>
                  </div>
                  <div className="character-answer">
                    <span>{activePerspective.character}</span>
                    <p><RichText text={activeQuestion.answer[answerPage]} /></p>
                  </div>
                  <div className="dialogue-controls">
                    <span>{answerPage + 1} / {activeQuestion.answer.length}</span>
                    <button className="button button-primary" onClick={advanceDialogue}>
                      {answerPage < activeQuestion.answer.length - 1 ? "Continue" : "Record this evidence"}
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </article>
              ) : (
                <article className="question-card">
                  <p className="scene-introduction">{activePerspective.introduction}</p>
                  <div className="question-heading">
                    <p className="eyebrow">Interview</p>
                    <h3>What will you ask?</h3>
                    <p>Ask all three questions to unlock the worksheet checkpoint.</p>
                  </div>
                  <div className="question-list">
                    {activePerspective.questions.map((question, index) => {
                      const hasAsked = asked[activePerspective.id].includes(question.id);
                      return (
                        <button key={question.id} onClick={() => chooseQuestion(question.id)}>
                          <span className={hasAsked ? "question-number question-done" : "question-number"}>
                            {hasAsked ? "✓" : index + 1}
                          </span>
                          <strong>{question.prompt}</strong>
                          <span aria-hidden="true">→</span>
                        </button>
                      );
                    })}
                  </div>
                  {asked[activePerspective.id].length === activePerspective.questions.length && (
                    <button className="button button-primary checkpoint-shortcut" onClick={() => setShowCheckpoint(true)}>
                      Open worksheet checkpoint <span aria-hidden="true">→</span>
                    </button>
                  )}
                </article>
              )}
            </div>
          </div>
        </section>
      )}

      {view === "journal" && (
        <section className="panel-screen journal-screen">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Town journal</p>
              <h2>Your recorded perspectives</h2>
              <p>Strongest motivations appear in solid colour; supporting motivations are outlined.</p>
            </div>
            <button className="button button-back" onClick={() => setView("hub")}>← Town square</button>
          </div>

          <div className="journal-grid">
            {perspectives.map((perspective) => {
              const isComplete = completed.includes(perspective.id);
              return (
                <article className={isComplete ? "journal-card" : "journal-card journal-locked"} key={perspective.id}>
                  <div className="journal-card-top">
                    <span>{isComplete ? perspective.initials : "?"}</span>
                    <div>
                      <h3>{perspective.location}</h3>
                      <p>{isComplete ? perspective.character : "Perspective not yet recorded"}</p>
                    </div>
                  </div>
                  {isComplete ? (
                    <>
                      <MotivationTags
                        strongest={perspective.journal.strongest}
                        supporting={perspective.journal.supporting}
                      />
                      <p>{perspective.journal.note}</p>
                      <button className="text-button" onClick={() => openEncounter(perspective.id)}>Review interview →</button>
                    </>
                  ) : (
                    <button className="button button-quiet" onClick={() => openEncounter(perspective.id)}>Visit location</button>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}

      {view === "synthesis" && (
        <section className="panel-screen synthesis-screen">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Evidence ledger</p>
              <h2>Use your interviews on the worksheet</h2>
              <p>Use the evidence below to complete Task 3 and plan Task 4 in your own words.</p>
            </div>
            <button className="button button-back" onClick={() => setView("hub")}>← Town square</button>
          </div>

          <section className="evidence-section">
            <div className="section-title-row">
              <span>03</span>
              <div><p className="eyebrow">Task 3</p><h3>Word bank decoder</h3></div>
            </div>
            <div className="word-bank-grid">
              {wordBank.map((item) => (
                <article key={item.term}>
                  <strong>{item.term}</strong>
                  <p>{item.clue}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="evidence-section">
            <div className="section-title-row">
              <span>04</span>
              <div><p className="eyebrow">Task 4</p><h3>Critical-thinking planner</h3></div>
            </div>
            <div className="synthesis-grid">
              {synthesisPrompts.map((item) => (
                <article key={item.task}>
                  <p className="task-label">{item.task}</p>
                  <h4>{item.prompt}</h4>
                  <p>{item.guide}</p>
                  <div className="sentence-starter">
                    <span>Start with</span>
                    <p>One important perspective is ... because ...</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="final-reminder">
            <span aria-hidden="true">✓</span>
            <div>
              <strong>Complete Tasks 3 and 4 in your own words.</strong>
              <p>Use specific examples from at least two perspectives where a question asks you to compare or explain.</p>
            </div>
          </aside>
        </section>
      )}

      {view !== "intro" && view !== "encounter" && (
        <footer className="game-footer">
          <button className="text-button" onClick={() => setShowSources(true)}>Historian&apos;s note & sources</button>
          <button className="text-button danger-link" onClick={resetProgress}>Reset investigation</button>
        </footer>
      )}

      {showSources && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setShowSources(false)}>
          <section className="source-modal" role="dialog" aria-modal="true" aria-labelledby="source-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="modal-heading">
              <div>
                <p className="eyebrow">Historian&apos;s note</p>
                <h2 id="source-title">A crossroads across time</h2>
              </div>
              <button className="modal-close" onClick={() => setShowSources(false)} aria-label="Close">×</button>
            </div>
            <p>
              This town is a fictional learning space. Its characters combine perspectives from the First,
              Third and Fourth Crusades, so they should not be treated as six people meeting in one real place
              or year. Their dialogue is reconstructed from class materials and checked historical background;
              none of it is a direct historical quotation.
            </p>
            <div className="accuracy-note">
              <strong>Two source corrections are built in.</strong>
              <p>
                Jerusalem did not remain Byzantine until 1077; Alexios I sought help after Seljuk expansion into
                Byzantine Asia Minor. Urban II&apos;s spiritual promise is also described more precisely as remission
                of penance, while retaining the worksheet&apos;s key language of forgiveness and heaven.
              </p>
            </div>
            <div className="source-list">
              {sources.map((source) => (
                <article key={source.label}>
                  <strong>{source.label}</strong>
                  <p>{source.detail}</p>
                  {source.href && <a href={source.href} target="_blank" rel="noreferrer">Open source ↗</a>}
                </article>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
