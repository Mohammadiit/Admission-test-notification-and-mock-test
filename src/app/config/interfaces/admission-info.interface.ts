import {Roles} from '../enum/default.enum';
export interface AdmissionInformation  {
  universityName?: string,
  unitName?: string,
  applicationStarts?: string,
  applicationEnds?: string,

  examDate: string,


  officialNoticeLink?: string,
  minimumCGPA?: string,
  hscPassingYear?: string,

  sscPassingYear?: string,

  extraRequirements?: string,
  totalFees?: string,
  admitCardLink?: string,


  seatPlanLink?: string,
  meritListLink?: string,


}
