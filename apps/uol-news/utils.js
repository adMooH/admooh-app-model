export function getLinkCode(link) {
  return 'f_' + Array.from(link).reduce((s, c) => (Math.imul(31, s) + c.charCodeAt(0)) | 0, 0);
}

export const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export const feedUrls = {
  0: 'https://www3.uol.com.br/xml/midiaindoor/cotidiano.xml',
  1: 'https://www3.uol.com.br/xml/midiaindoor/esporte.xml',
  2: 'https://www3.uol.com.br/xml/midiaindoor/entretenimento.xml',
  3: 'https://www3.uol.com.br/xml/midiaindoor/destaques.xml',
  4: 'https://www3.uol.com.br/xml/midiaindoor/internacional.xml',
};

export const feedColors = {
  0: '235, 70, 52',
  1: '235, 226, 52',
  2: '70, 235, 52',
  3: '52, 235, 226',
  4: '235, 52, 235',
};
