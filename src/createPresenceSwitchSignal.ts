import { createSignal, createEffect, type Accessor } from "solid-js";
import createPresenceSignal from "./createPresenceSignal";

export default function createPresenceSwitchSignal<ItemType>(
  item: Accessor<ItemType | undefined>,
  optsInit: Parameters<typeof createPresenceSignal>[1]
) {
  const [mountedItem, setMountedItem] = createSignal(item());
  const [shouldBeMounted, setShouldBeMounted] = createSignal(
    item !== undefined
  );
  const { isMounted, ...rest } = createPresenceSignal(
    shouldBeMounted,
    optsInit
  );

  createEffect(() => {
    if (mountedItem() !== item()) {
      if (isMounted()) {
        setShouldBeMounted(false);
      } else if (item !== undefined) {
        setMountedItem(() => item());
        setShouldBeMounted(true);
      }
    } else if (item() === undefined) {
      setShouldBeMounted(false);
    } else if (item() !== undefined) {
      setShouldBeMounted(true);
    }
  });

  return {
    ...rest,
    isMounted: () => isMounted() && mountedItem() !== undefined,
    mountedItem,
  };
}
