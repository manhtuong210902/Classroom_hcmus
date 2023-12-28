import { GradeComposition } from "./entities/grade-composition.entity";
import { StudentComposition } from "./entities/student-composition.entity";
import { StudentId } from "./entities/student-id.entity";

export const compositionProviders = [
    { provide: 'GradeCompositionRepository', useValue: GradeComposition },
    { provide: 'StudentIdRepository', useValue: StudentId},
    { provide: 'StudentCompositionsRepository', useValue: StudentComposition}
];