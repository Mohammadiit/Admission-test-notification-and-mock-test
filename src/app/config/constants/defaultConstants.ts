// This can vary if routes are changed in module so maintain consistency
export const defaultConst = {
  emailsent:'Email sent successfully',
}

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
    }
  }

};
