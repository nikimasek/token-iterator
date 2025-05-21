# Token Iterator

A simple tool for iterating over tokens in a string according to a regex pattern.

## Installation

```bash
npm install token-iterator
```

## Usage

```typescript
import { createTokenIterator } from 'token-iterator';

const text = 'This is a sample text.';
const iterator = new createTokenIterator(/\w+/, text);

while (iterator.hasNext()) {
  console.log(iterator.next());
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
