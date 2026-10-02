CREATE TABLE [dbo].[Cars]
(
    [Id] INT NOT NULL
        CONSTRAINT [PK_Cars] PRIMARY KEY,
    [Brand] NVARCHAR(100) NOT NULL,
    [Model] NVARCHAR(100) NOT NULL,
    [Year] INT NOT NULL,
    [Category] NVARCHAR(100) NOT NULL
);
