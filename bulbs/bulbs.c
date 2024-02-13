#include <cs50.h>
#include <stdio.h>
#include <string.h>
#include <ctype.h>

const int BITS_IN_BYTE = 8;

void print_bulb(int bit);

int main(void)
{
    // TODO
     string bit = get_string("Number: ");
}

void print_bulb(int bit)
{
    for (int i = 0, n = strlen(bit); i < n; i++)
    {
          printf("%c", toupper(bit[i]));

    if (bit == 0)
    {
        // Dark emoji
        printf("\U000026AB");
    }
    else if (bit == 1)
    {
        // Light emoji
        printf("\U0001F7E1");
    }
    }
}
