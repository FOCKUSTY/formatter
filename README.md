# Formatter

Простой форматировщик ваших выводов в консоль или для удобства использование в коде

![Static Badge](https://img.shields.io/badge/fockusty-formatter-formatter)
![GitHub top language](https://img.shields.io/github/languages/top/fockusty/formatter)
![GitHub](https://img.shields.io/github/license/fockusty/formatter)
![GitHub Repo stars](https://img.shields.io/github/stars/fockusty/formatter)
![GitHub issues](https://img.shields.io/github/issues/fockusty/formatter)

### Установка (Windows, npm/pnpm)

1. Локально
```
npm install --save f-formatter --latest
```

или

```
pnpm install --save f-formatter --latest
```

2. Глобально
```
npm install --global --save f-formatter --latest
```

или

```
pnpm install --global --save f-formatter --latest
```

<hr>

## Examples

### Formatter
```ts
import Formatter from 'f-formatter';
import { Colors } from 'f-formatter/colors';

import path from 'node:path';
import fs from 'node:fs';

const jsonPATH = './file.json'; /* YOUR-PATH */
const json = fs.readFileSync(path.json(jsonPATH), 'utf-8');
const formatter = new Formatter();

/* RuWords требует числового значения, а также стадии (1 объект, 2 объекта, 5 объектов) */
console.log(10, formatter.RuWords(10, ["Штука", "Штуки", "Штук"])); // 10 Штук

/* Comma требует числового или текстового значения */
console.log(formatter.Comma(30.1)); // 30,1

/* FromJSON требует json-file */
console.log(formatter.FromJSON(json)); // Вывыдет объект, массив или null;

/* FromJSONWithPath требует путь к json-file */
console.log(formatter.FromJSONWithPath(jsonPATH)); // Вывыдет объект, массив или null;

/* Color требует текстового значение и цвет */
console.log(formatter.Color('Привет!', Colors.magenta)); // \u001b[35mПривет!\u001B[0m, выведет цветное Привет!

/* Colored требует текстового значение, цвет и разделитель слов */
console.log(formatter.Colored('Я говорю', [Colors.magenta, Colors.reset], ' '));
// \u001b[35mЯ!\u001B !\u001Bговорю!\u001B, выведет цветное Я говорю
```

### DateFormatter
```ts
import Formatter from 'f-formatter';

const formatter = new Formatter().date;

/* Date требует дату, числовое значение или строку и формат, как вывести время */
console.log(formatter.Date(new Date(), 'HH:mm:ss')); // Выведет действительные часы:минуты:секунды

/* Timestamp требует настоящее время (Год, месяц, год) соотвественно [number, number, number] или в виде объекта */
console.log(formatter.Timestamp(formatter.time));
// Выведет временную метку, начинающаяся с 1970 года 1 января в 3 часа, точную вплодь до одного дня (Погрешность функции)

/* toLocaleDMY требует настоящее время (Год, месяц, год) соотвественно [number, number, number] или в виде объект */
console.log(formatter.toLocaleDMY(formatter.time));
// Выведет год, месяц, день, прошедшие с 1970 года 1 января с 3 часов
```

### Time
```ts
import Formatter from 'f-formatter';

const time = new Formatter().date.time;

/* Требует настоящий месяц */
console.log(time.getMonthDays(time.time.month)); // Выведет количество дней в данном месяце

/* Требует настоящий месяц */
console.log(time.getMonthDaysFromJanuary(time.time.month)); // Выведет количество дней, прошедшее с начала января
```

<hr>

# Если
- Если возникли проблемы или сложности, создайте [обсуждение](https://github.com/fockusty/formatter/issues/new/choose) в репозитории
- Если Вы заметили проблемы в коде, пишите мне в [Discord](https://discord.gg/5MJrRjzPec) или в [Telegram](https://t.me/FOCKUSTY)
