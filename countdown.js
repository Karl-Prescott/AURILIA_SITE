/* Set only after Karl approves an exact ISO date/time including Z or UTC offset.
 * This file is public: never add credentials or other secrets.
 */
const LAUNCH_AT = '2026-12-21T17:17:00-05:00';

(function (root) {
  'use strict';
  function countdownState(target, now = Date.now()) {
    if (typeof target !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/.test(target)) {
      return { status: 'unconfirmed' };
    }
    const [year, month, day] = target.slice(0, 10).split('-').map(Number);
    const calendarDate = new Date(target.slice(0, 10) + 'T00:00:00Z');
    if (calendarDate.getUTCFullYear() !== year || calendarDate.getUTCMonth() + 1 !== month || calendarDate.getUTCDate() !== day) {
      return { status: 'unconfirmed' };
    }
    const timestamp = Date.parse(target);
    if (!Number.isFinite(timestamp) || !Number.isFinite(now)) return { status: 'unconfirmed' };
    const total = Math.max(0, Math.ceil((timestamp - now) / 1000));
    return {
      status: total === 0 ? 'expired' : 'active', timestamp,
      days: Math.floor(total / 86400), hours: Math.floor(total / 3600) % 24,
      minutes: Math.floor(total / 60) % 60, seconds: total % 60
    };
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { countdownState };
  if (!root.document) return;
  const doc = root.document;
  const counter = doc.getElementById('countdown');
  const status = doc.getElementById('launch-status');
  const date = doc.getElementById('launch-date');
  const note = doc.getElementById('launch-note');
  let timer;
  function render() {
    const state = countdownState(LAUNCH_AT);
    counter.hidden = state.status !== 'active';
    date.hidden = state.status !== 'active';
    note.hidden = state.status !== 'active';
    if (state.status === 'unconfirmed') {
      status.textContent = 'Date de lancement à confirmer';
    } else if (state.status === 'expired') {
      status.textContent = 'Dernières vérifications en cours';
    } else {
      status.textContent = 'Objectif bêta — date prévisionnelle';
      date.textContent = new Intl.DateTimeFormat('fr-CA', {
        timeZone: 'America/Toronto', dateStyle: 'long', timeStyle: 'short'
      }).format(state.timestamp) + ' (heure du Québec)';
      for (const unit of ['days', 'hours', 'minutes', 'seconds']) {
        doc.getElementById(unit).textContent = String(state[unit]).padStart(2, '0');
      }
    }
    if (state.status !== 'active' && timer) root.clearInterval(timer);
    return state.status;
  }
  if (render() === 'active') timer = root.setInterval(render, 1000);
})(typeof window !== 'undefined' ? window : globalThis);
