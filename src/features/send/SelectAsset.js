import React, { useState } from 'react';
import { useCombobox } from 'downshift';
import { useHandles } from '@tokenized/sdk-react-private';
import classNames from 'classnames';
import SelectAssetType from './SelectAssetType';

function SelectAsset() {
  return (
    <>
      <SelectAssetType />
    </>
  );
}

export default SelectAsset;
