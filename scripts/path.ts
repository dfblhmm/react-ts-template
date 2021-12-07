import { resolve } from 'path';

const getPath = (...path: string[]) => resolve(process.cwd(), ...path);

export default getPath;
