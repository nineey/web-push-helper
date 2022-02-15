import { Spinner } from "@chakra-ui/react";

export default function FullScreenSpinner() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="green.500"
        size="xl"
      />
    </div>
  );
}
