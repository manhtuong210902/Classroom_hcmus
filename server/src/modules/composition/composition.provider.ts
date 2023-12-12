import { GradeComposition } from "./entities/grade-composition.entity";

export const compositionProviders = [{ provide: 'GradeCompositionRepository', useValue: GradeComposition }];