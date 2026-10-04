export type HeroMotionState = {
  progress: number;
  pointerX: number;
  pointerY: number;
};

export const initialHeroMotion = (): HeroMotionState => ({
  progress: 0,
  pointerX: 0,
  pointerY: 0,
});
