"use client";

import { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";
import { EnrollmentCheckTable } from "@/components/domains/enrollment-check";
import { AuthUserInfo } from "@/contexts";

function EnrollmentCheckPage() {
  return (
    <AuthUserInfo.Provider>
      <SpacerSkleton id="main-content" type="vertical" gap={72}>
        <SpacerSkleton type="vertical" align="center">
          <Typography typo="headline">등록 확인</Typography>
        </SpacerSkleton>
        <SpacerSkleton type="vertical" gap={44}>
          <EnrollmentCheckTable />
        </SpacerSkleton>
      </SpacerSkleton>
    </AuthUserInfo.Provider>
  );
}

export default EnrollmentCheckPage;
