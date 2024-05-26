#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
typedef uint8_t BYTE;

#define BLOCK_SIZE 512 // from notes

int main(int argc, char *argv[])
{
    // check that the argument count is 2
    if (argc != 2)
    {
        printf("Usage: ./recover FILE\n");
        return 1;
    }

    // Open the memory card
    FILE *input_file = fopen(argv[1], "r");

    // check that tha input_file is valid
    if (input_file == NULL)
    {
        printf("Could not open file");
        return 2;
    }

    // Store Blocks of bytes in a array
    unsigned char buffer[512];

    // Track number of images generated
    int count_image = 0;

    // File pinter for recovered images
    FILE *output_file = NULL;

    // char filename[8]
    char *filename = malloc(8 * sizeof(char));

    // read the blocks of 512 bytes
    while (fread(buffer, sizeof(char), 512, input_file))
    {
        // check if bytes indicate start of jpeg
        if (buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff && (buffer[3] & 0xf0) == 0xe0)
        {
            // write the jpeg filenames
            sprintf(filename, "%03i.jpg", count_image);

            // Open output_file for writing
            output_file = fopen(filename, "w");

            // Count number of imaes found
            count_image++;
        }
        // check if output has been used for valid inout
        if (output_file != NULL)
        {
            fwrite(buffer, sizeof(char), 512, output_file);
        }
    }
    free(filename);
    fclose(output_file);
    fclose(input_file);

    return 0;
}
