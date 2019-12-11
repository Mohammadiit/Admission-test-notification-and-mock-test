// This can vary if routes are changed in module so maintain consistency
import {Roles} from '../enum/default.enum';

export const defaultConst = {
  emailsent:'Email sent successfully',
};
export const admissionHelperConst = {
  sideBar: [
    {
      name: 'Home',
      url: '',
      icon: 'home',
      role: [Roles.Admin, Roles.Customer, Roles.Anonymous ],
      mini_name: 'Home'
    },{
      name: 'Admission Info List',
      url: '/admission-info/list',
      icon: 'assignment',
      role: [Roles.Admin, Roles.Customer, Roles.Anonymous],
      mini_name: 'Ad.list'
    },
    {
      name: 'Admission Info Upload',
      url: '/admission-info/upload',
      icon: 'cloud_upload',
      role: [Roles.Admin],
      mini_name: 'Ad.upload'
    },
    {
      name: 'Question Upload',
      url: '/questions/upload',
      icon: 'question_answer',
      role: [Roles.Admin],
      mini_name: 'Q.upload'
    },
    {
      name: 'Exam',
      url: '/questions/list',
      icon: 'explicit',
      role: [Roles.Customer],
      mini_name: 'Exam'
    },
    {
      name: 'Contest List',
      url: '/questions/contest-list',
      icon: 'format_align_justify',
      role: [Roles.Admin, Roles.Customer],
      mini_name: 'Con.list'
    },
    {
      name: 'Set contest',
      url: '/questions/set-contest',
      icon: 'people_outline',
      role: [Roles.Admin],
      mini_name: 'Set.contest'
    },
    {
      name: 'Contest results',
      url: '/questions/contest-result-list',
      icon: 'bar_chart',
      role: [Roles.Customer],
      mini_name: 'Con.result'
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
