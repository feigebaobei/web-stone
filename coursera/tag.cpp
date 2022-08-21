#include<stdio.h>
 int main()
 {
     int n;
     char a[260];
     int i,j;
     scanf("%d",&n);
     for(i=0;i<n;i++)
     {
        scanf("%s",a);
        for(j=0;a[j]!='\0';j++)
        {
            switch(a[j])
            {
                case 'A':
                    printf("T");
                    break;
                case 'G':
                    printf("C");
                    break;
                case 'C':
                    printf("G");
                    break;
                case 'T':
                    printf("A");
                    break;
            }
        }
        printf("\n");
    }
    return 0;
}