// This can vary if routes are changed in module so maintain consistency
import {Roles} from '../enum/default.enum';

export const defaultConst = {
  emailsent:'Email sent successfully',
};
export const admissionHelperConst = {
  sideBar: [
    {
      name: 'Admission Information List',
      url: '/admission-info/list',
      icon: 'home',
      role: [Roles.Admin, Roles.Customer],
      mini_name: 'Home'
    },
    {
      name: 'Admission Information Upload',
      url: '/admission-info/upload',
      icon: 'home',
      role: [Roles.Admin],
      mini_name: 'Home'
    },
    {
      name: 'Question Upload',
      url: '/questions/list',
      icon: 'home',
      role: [Roles.Admin],
      mini_name: 'Home'
    },
    {
      name: 'Exam',
      url: '/questions/list',
      icon: 'home',
      role: [Roles.Customer],
      mini_name: 'Home'
    }
  ]
};
export const urlPaths = {
  Authentication: {
    Signin: {
      url: '/auth/log-in'
    },
    Signup: {
      url: '/auth/sign-up'
    },
    AccountRecovery: {
      url: '/auth/account-recovery'
    }
  },
  AdmissionInfo: {
    AdmissionInfoUpload: {
      url: '/admission-info/upload'
    },
    AdmissionInfo: {
      url: '/admission-info/info'
    },
    AdmissionInfoList: {
      url: '/admission-info/list'
    }
  },
  Question: {
    QuesionUpload: {
      url: '/questions/upload'
    },
    exam: {
      url: '/questions/exam'
    },
    list: {
      url: '/questions/list'
    },
    result: {
      url: '/questions/result'
    }
  }

};
