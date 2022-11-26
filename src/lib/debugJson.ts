export const debugSaveJson = (data: InputStats) => {
  const fileName = 'statcalculator.json';

  const json = JSON.stringify(data, null, '  ');

  const blob = new Blob([json], { type: 'application/json' });
  const href = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const debugLoadJson = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (f) => {
      const text = f.target?.result;
      if (typeof text !== 'string') return;
      const data = JSON.parse(text);
      reset(data);
    };
    reader.readAsText(file);
  };
  input.click();
};
