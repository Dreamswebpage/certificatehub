ALTER TABLE "Certificate"
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "courseName" TEXT,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "pricingType" TEXT NOT NULL DEFAULT 'FREE',
ADD COLUMN     "courseContent" TEXT,
ADD COLUMN     "benefits" TEXT,
ADD COLUMN     "metaTitle" TEXT,
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "keywords" TEXT;

UPDATE "Certificate"
SET
  "slug" = LOWER(
    REGEXP_REPLACE(
      COALESCE(NULLIF("title", ''), "id"),
      '[^a-zA-Z0-9]+',
      '-',
      'g'
    )
  ),
  "courseName" = COALESCE(NULLIF("title", ''), 'Certificate');

UPDATE "Certificate"
SET "slug" = TRIM(BOTH '-' FROM "slug");

UPDATE "Certificate"
SET "slug" = "slug" || '-' || SUBSTRING("id" FROM 1 FOR 6)
WHERE "slug" IN (
  SELECT "slug"
  FROM "Certificate"
  GROUP BY "slug"
  HAVING COUNT(*) > 1
);

UPDATE "Certificate"
SET "slug" = 'certificate-' || SUBSTRING("id" FROM 1 FOR 6)
WHERE "slug" IS NULL OR "slug" = '';

ALTER TABLE "Certificate"
ALTER COLUMN "slug" SET NOT NULL,
ALTER COLUMN "courseName" SET NOT NULL;

CREATE UNIQUE INDEX "Certificate_slug_key" ON "Certificate"("slug");
