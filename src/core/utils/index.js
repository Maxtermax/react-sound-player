export function logger(data) {
  if (!process.env.NODE_ENV) console.log(data);
}

export function mapSelected(data, selected = false) {
  return data.map((item) => {
    item.selected = selected;
    return item;
  });
}

export function groupById(data) {
  return data.reduce((accumulator, item) => {
    const { id } = item;
    accumulator[id] = item;
    return accumulator;
  }, {});
}

export function resolvePromise(promise) {
  return promise
    .then((result) => Promise.resolve({ ok: true, error: null, result }))
    .catch((error) => Promise.resolve({ error, ok: false, result: null }));
}

function prefixDigit(digit) {
  if (digit <= 9) return `0${digit}`;
  return `${digit}`;
}

export function mapTime(currentTime) {
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime - minutes * 60);
  return `${prefixDigit(minutes)}:${prefixDigit(seconds)}`;
}

export function mapDurationToTime(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration - minutes * 60);
  return `${prefixDigit(minutes)}:${prefixDigit(seconds)}`;
}
