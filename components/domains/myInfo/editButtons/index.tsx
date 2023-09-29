import DefaultButton from "@/components/common/button";
import { SpacerSkleton } from "@/components/common/spacer";

interface Props {
  isEditing: boolean;
  _onClickEditing: (isEditing: boolean) => void;
}

function EditButtons({ isEditing, _onClickEditing }: Props) {
  const onClickEditConfirm = () => {
    _onClickEditing(!isEditing);
  };

  return (
    <SpacerSkleton gap={isEditing ? 10 : 0} justify="center">
      {isEditing ? (
        <>
          <DefaultButton
            type="button"
            sort="secondary"
            onClick={onClickEditConfirm}
          >
            취소
          </DefaultButton>
          <DefaultButton type="submit">확인</DefaultButton>
        </>
      ) : (
        <DefaultButton
          type="button"
          sort="secondary"
          onClick={onClickEditConfirm}
        >
          수정
        </DefaultButton>
      )}
    </SpacerSkleton>
  );
}

export default EditButtons;
