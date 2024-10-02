/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-expressions */
export enum PokemonType {
  BUG = 'bug',
  DRAGON = 'dragon',
  FAIRY = 'fairy',
  FIRE = 'fire',
  GHOST = 'ghost',
  GROUND = 'ground',
  NORMAL = 'normal',
  PSYCHIC = 'psychic',
  STEEL = 'steel',
  DARK = 'dark',
  ELECTRIC = 'electric',
  FIGHTING = 'fighting',
  FLYING = 'flying',
  GRASS = 'grass',
  ICE = 'ice',
  POISON = 'poison',
  ROCK = 'rock',
  WATER = 'water',
}

export const colorMapper = (color: string): string => {
  switch (color) {
    case PokemonType.BUG:
      return '#adbd21';
    case PokemonType.DRAGON:
      return '#7b63e7';
    case PokemonType.FAIRY:
      return '#f7b5f7';
    case PokemonType.FIRE:
      return '#f75231';
    case PokemonType.GRASS:
      return '#7bce52';
    case PokemonType.ICE:
      return '#5acee7';
    case PokemonType.ROCK:
      return '#bda55a';
    case PokemonType.WATER:
      return '#399cff';
    case PokemonType.POISON:
      return '#b55aa5';
    case PokemonType.FLYING:
      return '#9cadf7';
    case PokemonType.FIGHTING:
      return 'yellow';
    case PokemonType.ELECTRIC:
      return '#ffc631';
    case PokemonType.STEEL:
      return '#adadc6';
    case PokemonType.PSYCHIC:
      return '#ff73a5';
    case PokemonType.NORMAL:
      return '#ada594';
    case PokemonType.GROUND:
      return '#d6b55a';
    case PokemonType.GHOST:
      return '#6363b5';
    case PokemonType.DARK:
      return '#735a4a';
    default:
      return 'black';
  }
};

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function rgbToHsl(
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } {
  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h, s, l };
}

const hexToHsl = (hex: string): string => {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  return `hsl(${h * 360}, ${s * 100}%, ${l * 80}%)`;
};

export const colorBorder = (color: string): string => {
  return hexToHsl(color);
};

export const generateBoxShadow = (pokemonType: string): string => {
  return `0 0.5em ${colorMapper(pokemonType)},
    0 -0.5em ${colorMapper(pokemonType)},
    0.5em 0 ${colorMapper(pokemonType)},
    -0.5em 0 ${colorMapper(pokemonType)}`;
};
