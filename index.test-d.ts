import { file, withFile, dir, withDir, tmpName } from ".";

async function fileExample() {
  const { path, fd, cleanup } = await file({ discardDescriptor: true });

  await withFile(
    async ({ path, fd, cleanup }) => {
      console.log(fd);
    },
    { discardDescriptor: true }
  );
}

async function dirExample() {
  const { path, cleanup } = await dir({ unsafeCleanup: true });

  await withDir(
    async ({ path, cleanup }) => {
      console.log(path);
    },
    { unsafeCleanup: true }
  );
}

async function tmpNameExample() {
  const name = await tmpName({ tries: 3 });
}
